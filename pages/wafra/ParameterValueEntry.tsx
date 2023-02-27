import _ from "lodash";
import { iFormProps, Nar,  InputProps, SelectProps,  ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType, CheckboxProps, ISelectRef, InputNumberProps, DateProps } from "nar-ui-library"
import { NarUtils } from "nar-ui-utils";

/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */


const ParameterValueEntryPage = () => {
    let useForm = Nar.Form.useForm();
    let useScreen = Nar.Screen.useScreen();
    let table = Nar.Controller.useDataTable();

    const IParameterValueEntry = {

        onSaveClick: async (Screen: ScreenRef) => {
            let insertData = table.getValueAdvance().Value.Insert;
            let deleteData = table.getValueAdvance().Value.Delete;
            let updateData = table.getValueAdvance().Value.Update;
            if (Object.keys(insertData).length > 0) {
                if (!IParameterValueEntry.InsertDatas()) {
                    return false;
                }
            }
            else if (Object.keys(deleteData).length > 0) {
                if (!IParameterValueEntry.DeleteDatas()) {
                    return false;
                }
            }
            else if (Object.keys(updateData).length > 0) {
                if (!IParameterValueEntry.UpdateDatas()) {
                    return false;
                }
            }
            return true;
        },
        SearchForm: (): DataTableSearchForm => {
            return {
                onClick: async (form) => {
                    if (form.getValue().period != "undefined" && form.getValue().period != null) {
                        let response = await NarUtils.Request.Get<any[]>({
                            url: "wafraapi/v1/management/valuations?period=" + form.getValue().period
                        })
                        if (response.isSuccess == true) {
                            table.setValue(response.data);
                        } else {
                            Nar.Modal.Alert("Response Error", response.message, "Ok");
                        }

                    } else {
                        let response = await NarUtils.Request.Get<any[]>({
                            url: "wafraapi/v1/management/valuations"
                        })
                        if (response.isSuccess == true) {
                            table.setValue(response.data);
                        } else {
                            Nar.Modal.Alert("Response Error", response.message, "Ok");
                        }
                    }
                }
            }
        },
        EditForm: (): DataTableEditForm => {
            return {
                onEditMessage: (form) => {

                    let data = form.getValue();
                    return data;
                },
                onEditModalOpenDataFormat(data) {
                    return data;
                },
                formComponents: {
                    objectName: "Form2", objectType: "Form", props: ({
                        id: "Frm2", responsiveSize: { col: 2 }
                    } as iFormProps),
                    children: [
                        { objectName: "factorCode", objectType: "Select", props: { id: "factorCode", label: "factorCode", ApiData: IParameterValueEntry.GetFactors, hookContextKey: "factorCode" } as SelectProps },
                        { objectName: "percentageValue", objectType: "Input", props: ({ id: "percentageValue", label: "percentageValue", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz " } }] } as InputProps) },
                        { objectName: "percentageWeight", objectType: "Input", props: ({ id: "percentageWeight", label: "percentageWeight", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz " } }] } as InputProps) }
                    ]
                }
            }
        },
        GetFactors: async (relatedValue: any, that: ISelectRef) => {

            const res = await NarUtils.Request.Get<any[]>({
                url: "wafraapi/v1/management/valuations/factors"
            });
            let data: any = [];
            if (res.isSuccess == true) {
                data = (res.data ?? []).map(t => {
                    return { label: t.code, value: t.code, data: t }
                })
            }

            return {
                options: data,
                message: res.messagetype,
                messagetype: res.messagetype,
                isSuccess: res.isSuccess
            };

        },
        InsertDatas: async () => {
            let insertData = table.getValueAdvance().Value.Insert;
            let ViewData = table.getValueAdvance().Value.ViewData;
            if (Object.keys(ViewData).length > 0) {
                let total = 0;
                for (let i = 0; i < Object.keys(ViewData).length; i++) {
                    total += parseInt(ViewData[i].percentageWeight);
                }
                if (total != 100) {
                    Nar.Modal.Alert("Response Error", "Parametrelerin ağırlık toplamları %100 olmalıdır. ", "Ok");
                    return false;
                }

                let insertProcess = await NarUtils.Request.Post({
                    url: "wafraapi/v1/management/valuations",
                    blockElements: [table],
                    data: { valuations: [...insertData] }
                })

                if (insertProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", insertProcess.messagetype + " " + insertProcess.message, "Ok");
                    return false;
                }
            }
            else {
                Nar.Modal.Alert("Response Error", "Herhangi bir işlem girmediniz.", "Ok");
                return false;
            }
            return true;
        },
        UpdateDatas: async () => {
            let updateData = table.getValueAdvance().Value.Update;
            if (Object.keys(updateData).length > 0) {
                let total = 0;
                for (let i = 0; i < Object.keys(updateData).length; i++) {
                    total += parseInt(updateData[i].percentageWeight);
                }
                if (total != 100) {
                    Nar.Modal.Alert("Response Error", "Parametrelerin ağırlık toplamları %100 olmalıdır. ", "Ok");
                    return false;
                }

                let updateProcess = await NarUtils.Request.Post({
                    url: "wafraapi/v1/management/valuations",
                    blockElements: [table],
                    data: { valuations: [...updateData] }
                })
                if (updateProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
                    return false;
                }
                else {
                    Nar.Modal.Alert("Ok", "İşleminiz " + updateProcess.data + " referans numarası ile onaya düşmüştür.", "Ok");
                    return true;
                }
            }
            else {
                Nar.Modal.Alert("Response Error", "HerhangiBirIslemYapmadiniz.", "Ok");
                return false;
            }
        },
        DeleteDatas: async () => {
            let deleteData = table.getValueAdvance().Value.Delete;

            let deleteProcess = await NarUtils.Request.Delete({
                url: "Factors/v1/applications/" + deleteData[0].applicationId + "/apis/" + deleteData[0].apiId
            })
            if (deleteProcess.isSuccess == false) {
                Nar.Modal.Alert("Response Error", deleteProcess.messagetype + " " + deleteProcess.message, "Ok");
                return false;
            }

            return true;
        },
        TokenCalculateOnclick: async () => {
            let datas = table.getValueData();
            if (Object.keys(datas).length > 0) {
                let total = 0;
                for (let i = 0; i < Object.keys(datas).length; i++) {
                    total += parseInt(datas[i].percentageWeight);
                }
                if (total != 100) {
                    Nar.Modal.Alert("Response Error", "ParametrelerinAgirlikToplamlari%100olmalidir.", "Ok");
                    return false;
                }
                let token = await NarUtils.Request.Post({
                    url: "wafraapi/v1/management/valuations/review",
                    data: { valuations: [...datas] }
                })
                console.log(token.data);
                useForm.getController("Token").setValue("")
                if (token.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", token.messagetype + " " + token.message, "Ok");

                }
                else {
                    console.log(token.data);
                    useForm.getController("Token").setValue("Token Değeri: " + token.data);
                }
            }
            else {
                Nar.Modal.Alert("Response Error", "KayitGirmediniz", "Ok");
                return false;
            }
        },
        GetPeriod: async () => {
            const res = await NarUtils.Request.Get<any[]>({
                url: "wafraapi/v1/management/valuations/current-period"
            });
            useForm.getController("Period").setValue("Dönem : " + res.data);
        }
    }
    Nar.StartEvent(() => {
        IParameterValueEntry.GetPeriod();
    })
    return <>
        <useScreen.View screencode="ParameterValueEntry" screenname="Değerleme Parametre Giriş Ekranı " saveType={SaveType.clear} onSaveClick={IParameterValueEntry.onSaveClick}>
            <table.View
                id="ParameterValueEntryDataTable"
                maxHeight={800}
                SearchForm={IParameterValueEntry.SearchForm()}
                EditForm={IParameterValueEntry.EditForm()}
                filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
                columns={
                    [
                        {
                            dataKey: "factorCode", columnName: "factorCode", dataViewKey: "factorCode", columnControllerType: ControllerType.Select, columnControllerProps: {
                                id: "factorCode", ApiData: IParameterValueEntry.GetFactors, hookContextKey: "factorCode", returntype: "value"
                            } as SelectProps
                        },
                        { dataKey: "percentageValue", columnName: "percentageValue", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "percentageWeight", columnName: "percentageWeight", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "period", columnName: "period(MM/YY)", columnControllerType: ControllerType.Input, isNotRemoteFilter: false },
                        { dataKey: "createdDate", columnName: "createdDate", columnControllerType: ControllerType.Date, isNotRemoteFilter: true }
                    ]
                } />
            <useForm.View id="tokenForm" responsiveSize={{ col: 4 }} >
                <Nar.Button id="btnTokenCalculate" key={"btnTokenCalculate"} label={"TokenDegerHesapla"} icon={{ iconName: Nar.IconName.GitMerge }} onClick={IParameterValueEntry.TokenCalculateOnclick} />
                <Nar.Controller.Text id="Token" label={""} labellangformat={async (str) => { return str }} />
                <Nar.Controller.Text id="Period" label={""} />
            </useForm.View>
        </useScreen.View>
    </>
}
export default ParameterValueEntryPage