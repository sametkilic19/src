import { iFormProps, Nar, IDataTableProps, InputProps, SelectProps, FormRef, ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType } from "nar-ui-library"
import { NarUtils } from "nar-ui-utils";
import { useState } from "react";
export const comboDataParameter = [
    { value: 'Immediately', label: "Immediately" },
    { value: 'Day', label: "Day" },
    { value: 'Month', label: "Month" },
    { value: 'Year', label: "Year" }
]
/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */
const PrizeTypesDefinition = () => {
    /**
     * Screen 
     */
    let useScreen = Nar.Screen.useScreen();
    /**
     * Kullanilan Data Table
     */

    let table = Nar.Controller.useDataTable();
    let [editForm] = useState<FormRef>(null);
    const IPrizeTypesDefinition = {
        onSaveClick: async (Screen: ScreenRef) => {
            let updateData = table.getValueAdvance().Value.Update;
            let insertData = table.getValueAdvance().Value.Insert;
            if (updateData.length > 0) {
                let updateProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/prize-types",
                    blockElements: [table],
                    data: updateData[0]
                })

                if (updateProcess.isSuccess == false) {
                    //"Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
                    return false;
                }
            }
            if (insertData.length > 0) {

                let insertProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/prize-types",
                    blockElements: [table],
                    data: insertData[0]
                })
                if (insertProcess.isSuccess == false) {
                    //  Nar.Modal.Confirm.Alert("Response Error", insertProcess.messagetype + " " + insertProcess.message, "Ok");

                    return false;
                }
            }
            return true;
        },
        SearchForm: (): DataTableSearchForm => {
            return {
                onClick: async (form) => {
                    let response = await NarUtils.Request.Get<any[]>({
                        url: "wafraapi/v1/management/prize-types",
                        blockElements: [form],
                        data: form.getValue()
                    })
                    if (response.isSuccess == true) {
                        table.setValue(response.data);
                    } else {
                        //       Nar.Modal.Confirm.Alert("Response Error", response.messagetype + " " + response.message, "Ok");
                    }
                }
            }
        },
        EditForm: (): DataTableEditForm => {
            return {
                onEditMessage: (form) => {
                    console.log(form.getValue());
                    let data = form.getValue();
                    if (data.maturityType == "Immediately") {
                        data.rules = [];
                    }
                    console.log(data);
                    return data;
                },
                formComponents: {
                    objectName: "Form2", objectType: "Form", props: ({
                        id: "Frm2", responsiveSize: { col: 2 }, onLoad(form) {
                            editForm = form;
                        }
                    } as iFormProps),
                    children: [

                        { objectName: "name", objectType: "Input", props: ({ id: "name", label: "name" } as InputProps) },
                        { objectName: "code", objectType: "Input", props: ({ id: "code", label: "code" } as InputProps) },
                        {
                            objectName: "maturityType", objectType: "Select", props: ({
                                id: "maturityType", options: comboDataParameter, label: "maturityType", onChange: (val) => {
                                    if (val.value == "Immediately") {
                                        editForm.getController("rules").setHide(true);
                                    }
                                    else {
                                        editForm.getController("rules").setHide(false);
                                    }
                                }, returntype: "value"
                            } as SelectProps)
                        },
                        { objectName: "totalMaturityPeriod", objectType: "Input", props: ({ id: "totalMaturityPeriod", label: "totalMaturityPeriod" } as InputProps) },
                        { objectName: "status", objectType: "Input", props: ({ id: "status", label: "status" } as InputProps) },
                        { objectName: "tokenQuantity", objectType: "Input", props: ({ id: "tokenQuantity", label: "tokenQuantity" } as InputProps) },
                        {
                            objectName: "rules", objectType: "DataTable", props: ({
                                fullsize: true,
                                id: "rules", columns: [
                                    { columnName: "maturityPeriod", dataKey: "maturityPeriod", columnControllerType: ControllerType.Input },
                                    { columnName: "percentagle", dataKey: "percentagle", columnControllerType: ControllerType.Input },
                                    { columnName: "order", dataKey: "order", columnControllerType: ControllerType.Input }
                                ], editmode: "excel", isformcontroller: true,
                                returntype: "data"
                            } as IDataTableProps)
                        }
                    ]
                }
            }
        }

    }
    return <>
        <useScreen.View screencode="PrizeTypeDef" screenname="Ödül Tipi Ekranı" saveType={SaveType.disable} onSaveClick={IPrizeTypesDefinition.onSaveClick}>
            <table.View
                id="PrizeTypeDefDataTable"
                maxHeight={800}
                SearchForm={IPrizeTypesDefinition.SearchForm()}
                EditForm={IPrizeTypesDefinition.EditForm()}
                expandableRowsComponent={(e) => {
                    return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
                }}
                header="Ödül Tipi Ekranı."
                filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
                columns={
                    [
                        { dataKey: "id", columnName: "id", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "name", columnName: "name", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "code", columnName: "code", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "maturityType", columnName: "maturityType", columnControllerType: ControllerType.Select, isNotRemoteFilter: true },
                        { dataKey: "totalMaturityPeriod", columnName: "totalMaturityPeriod", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "status", columnName: "status", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "tokenQuantity", columnName: "tokenQuantity", columnControllerType: ControllerType.Input, isNotRemoteFilter: true }

                    ]
                } />
        </useScreen.View>
    </>
}

export default PrizeTypesDefinition