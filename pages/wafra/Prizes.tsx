
import { NarUtils } from "nar-ui-utils";
import { iFormProps, Nar, IDataTableProps, InputProps, SelectProps, FormRef, ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType, CheckboxProps, ISelectRef } from "nar-ui-library"

export const comboDataParameter = [
    { value: 'Immediately', label: "Immediately" },
    { value: 'Day', label: "Day" },
    { value: 'Month', label: "Month" },
    { value: 'Year', label: "Year" }
]
export const cmbStatusData = [
    { value: 'active', label: "Active" },
    { value: 'passive', label: "Passive" },
    { value: 'all', label: "All" }
]
/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */
const PrizesPage = () => {
    /**
     * Screen 
     */
    let useScreen = Nar.Screen.useScreen();
    /**
     * Kullanilan Data Table
     */

    let table = Nar.Controller.useDataTable();
    const IPrizes = {
        onSaveClick: async (Screen: ScreenRef) => {
            let updateData = table.getValueAdvance().Value.Update;
            let insertData = table.getValueAdvance().Value.Insert;
            let deleteData = table.getValueAdvance().Value.Delete;

            if (updateData.length > 0) {
                let updateProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/prizes/bulk",
                    blockElements: [table],
                    data: updateData
                })

                if (updateProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", "IslemBasarısızSonuclandi", "Ok");
                    return false;
                } else {
                    Nar.Modal.Alert("Response Error", "IslemBasarili", "Ok");
                    return true;
                }
            }

            if (insertData.length > 0) {

                let insertProcess = await NarUtils.Request.Post({
                    url: "wafraapi/v1/management/prizes/bulk",
                    blockElements: [table],
                    data: insertData
                })
                if (insertProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", "IslemBasarısızSonuclandi", "Ok");
                    return false;
                } else {
                    Nar.Modal.Alert("Response Error", "IslemBasarili", "Ok");
                    return true;
                }
            }

            if (deleteData.length > 0) {

                let deleteProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/prizes/bulk" + deleteData[0].getValue().pri,
                    blockElements: [table],
                    data: deleteData
                })
                if (deleteProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", "IslemBasarıszSonuclandi", "Ok");
                    return false;
                } else {
                    Nar.Modal.Alert("Response Error", "IslemBasarili", "Ok");
                    return true;
                }
            }
            return true;
        },
        SearchForm: (): DataTableSearchForm => {
            return {
                onClick: async (form) => {

                    if (form.getValue().userCode == "" || form.getValue().userCode == undefined) {
                        let responseUser = await NarUtils.Request.Get<any[]>({
                            url: "wafraapi/v1/management/prizes/search"
                        })
                        if (responseUser.isSuccess == true) {
                            Nar.Modal.Alert("Response Error", "KayıtlarListelendi", "Ok");
                            table.setValue(responseUser.data);
                        } else {
                            Nar.Modal.Alert("Response Error", responseUser.messagetype + " " + responseUser.message, "Ok");
                        }

                    } else {

                        let response = await NarUtils.Request.Get<any[]>({
                            url: "wafraapi/v1/management/prizes/search?UserCode=" + form.getValue().userCode,
                            blockElements: [form]
                        })
                        if (response.isSuccess == true) {
                            table.setValue(response.data);
                        } else {
                            Nar.Modal.Alert("Response Error", response.messagetype + " " + response.message, "Ok");
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
                        { objectName: "userCode", objectType: "Select", props: { id: "userCode", label: "userCode", returntype: "value", ApiData: IPrizes.GetUsers, hookContextKey: "userCode" } as SelectProps },
                        { objectName: "prizeTypeCode", objectType: "Input", props: ({ id: "prizeTypeCode", label: "prizeTypeCode", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }] } as InputProps) },
                        { objectName: "deliveryDate", objectType: "Date", props: ({ id: "deliveryDate", label: "deliveryDate" } as InputProps) },
                        { objectName: "quantity", objectType: "Input", props: ({ id: "quantity", label: "quantity", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }] } as InputProps) },
                        { objectName: "maturity", objectType: "Date", props: ({ id: "maturity", label: "maturity" } as InputProps) }                        
                    ]
                }
            }
        },
        GetUsers: async (relatedValue: any, that: ISelectRef) => {
            const res = await NarUtils.Request.Get<any[]>({
                url: "wafraapi/v1/management/kullanicilar?Status=Active"
            });

            let data: any = [];
            if (res.isSuccess == true) {
                data = (res.data ?? []).map(t => {
                    return { label: t.userCode + "-" + t.name + " " + t.surname, value: t.userCode, data: t }
                })
            }
            return {
                options: data,
                message: res.messagetype,
                messagetype: res.messagetype,
                isSuccess: res.isSuccess
            };
        },
        GetPrizeType: async (relatedValue: any, that: ISelectRef) => {
            const res = await NarUtils.Request.Get<any[]>({
                url: "wafraapi/v1/management/prize-types?Status=Active"
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
        }
    }
    return <>
        <useScreen.View screencode="Prizes" screenname="Ödül Tipi Dağıtım Ekranı " saveType={SaveType.disable} onSaveClick={IPrizes.onSaveClick}>
            <table.View
                id="Prizes"
                maxHeight={800}
                SearchForm={IPrizes.SearchForm()}
                EditForm={IPrizes.EditForm()}
                expandableRowsComponent={(e) => {
                    return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
                }}
                filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
                columns={
                    [
                        {
                            dataKey: "userCode", columnName: "userCode", dataViewKey: "userCode", columnControllerType: ControllerType.Select, columnControllerProps: {
                                id: "userCode", ApiData: IPrizes.GetUsers, hookContextKey: "userCode", returntype: "value"
                            } as SelectProps
                        },
                        {
                            dataKey: "code", columnName: "code", dataViewKey: "code", columnControllerType: ControllerType.Select, columnControllerProps: {
                                id: "code", ApiData: IPrizes.GetPrizeType, hookContextKey: "code", returntype: "value"
                            } as SelectProps
                        },
                        { dataKey: "deliveryDate", columnName: "deliveryDate", columnControllerType: ControllerType.Date, isNotRemoteFilter: true },
                        { dataKey: "quantity", columnName: "quantity", columnControllerType: ControllerType.Input, isNotRemoteFilter: true, isHidden: true },
                        { dataKey: "maturity", columnName: "maturity", columnControllerType: ControllerType.Date, isNotRemoteFilter: true, isHidden: true },
                        { dataKey: "maturityPeriod", columnName: "maturityPeriod", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "status", columnName: "status", columnControllerType: ControllerType.Select, isNotRemoteFilter: false, columnControllerProps: { id: "status", options: cmbStatusData, returntype: "value" } as SelectProps }

                    ]
                } />
        </useScreen.View>
    </>
}

export default PrizesPage