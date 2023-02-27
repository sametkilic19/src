import _ from "lodash";
import { iFormProps, Nar, IDataTableProps, InputProps, SelectProps, FormRef, ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType, CheckboxProps, ISelectRef } from "nar-ui-library"
import { NarUtils } from "nar-ui-utils";
import { useState } from "react";
export const comboDataParameter = [
    { value: 'Immediately', label: "Immediately" },
    { value: 'Day', label: "Day" },
    { value: 'Month', label: "Month" },
    { value: 'Year', label: "Year" }
]

export const cmbStatusData = [
    { value: 'Active', label: "Active" },
    { value: 'Passive', label: "Passive" }
]
/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */
const PrizeTypesDefinitionPage = () => {

    let useScreen = Nar.Screen.useScreen();
    let table = Nar.Controller.useDataTable();
    let [editForm] = useState<FormRef>(null);


    const IPrizeTypesDefinition = {
        onSaveClick: async (Screen: ScreenRef) => {           
            let updateData = table.getValueAdvance().Value.Update;
            let insertData = table.getValueAdvance().Value.Insert;
            let deleteData = table.getValueAdvance().Value.Delete;
            if (updateData.length > 0) {
                delete updateData[0].totalTokenQuantity;
                delete updateData[0].code;
                updateData[0].rules.forEach(element => {
                    delete element.order;
                });
                let updateProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/prize-types/" + updateData[0].id,
                    blockElements: [table],
                    data: updateData[0]
                })

                if (updateProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
                    return false;
                }
            }

            if (insertData.length > 0) {
                let tempInsertData = insertData;
                delete tempInsertData[0].status;
                delete tempInsertData[0].totalTokenQuantity;
                let insertProcess = await NarUtils.Request.Post({
                    url: "wafraapi/v1/management/prize-types",
                    blockElements: [table],
                    data: insertData[0]
                })
                if (insertProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", insertProcess.messagetype + " " + insertProcess.message, "Ok");
                    return false;
                } else {
                    Nar.Modal.Alert("Response Error", "IslemBasarili", "Ok");
                    return true;
                }
            }

            if (deleteData.length > 0) {             
                let deleteProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/prize-types/" + deleteData[0].getValue().id,
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
                    if (form.getValue().status != "undefined" && form.getValue().status != null) {
                        let response = await NarUtils.Request.Get<any[]>({
                            url: "wafraapi/v1/management/prize-types?Status=" + form.getValue().status,
                            blockElements: [form]
                        })
                        if (response.isSuccess == true) {
                            table.setValue(response.data);
                        } else {
                            Nar.Modal.Alert("Response Error", response.messagetype + " " + response.message, "Ok");
                        }
                    } else {
                        Nar.Modal.Alert("Response Error", "StatusBilgisiGirmediniz", "Ok");
                        return false;
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
                        { objectName: "status", objectType: "Select", props: { options: cmbStatusData, id: "status", label: "status", returntype: "value" } as SelectProps },
                        { objectName: "totalTokenQuantity", objectType: "Input", props: ({ id: "totalTokenQuantity", label: "totalTokenQuantity" } as InputProps) },
                        { objectName: "description", objectType: "Input", props: ({ id: "description", label: "description" } as InputProps) },
                        {
                            objectName: "rules", objectType: "DataTable", props: ({
                                fullsize: true,
                                id: "rules", columns: [
                                    { columnName: "maturityPeriod", dataKey: "maturityPeriod", columnControllerType: ControllerType.Input },
                                    { columnName: "tokenQuantity", dataKey: "tokenQuantity", columnControllerType: ControllerType.Input }
                                ], editmode: "excel", isformcontroller: true,
                                returntype: "data"
                            } as IDataTableProps)
                        }

                    ]
                }
            }
        }
    }
    Nar.StartEvent(() => {
        table.getSearchForm().setValue({ status: { value: 'Active', label: "Active" } })
    })
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
                filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
                columns={
                    [
                        { dataKey: "id", columnName: "id", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "name", columnName: "name", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "code", columnName: "code", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "maturityType", columnName: "maturityType", columnControllerType: ControllerType.Select, isNotRemoteFilter: true },
                        { dataKey: "status", columnName: "status", columnControllerType: ControllerType.Select, isNotRemoteFilter: false, columnControllerProps: { id: "status", options: cmbStatusData, returntype: "value" } as SelectProps },
                        { dataKey: "totalTokenQuantity", columnName: "totalTokenQuantity", columnControllerType: ControllerType.Input, isNotRemoteFilter: false },
                        { dataKey: "rules", columnName: "rules", columnControllerType: ControllerType.Input, isNotRemoteFilter: true, isHidden:true },
                        { dataKey: "description", columnName: "description", columnControllerType: ControllerType.Input, isNotRemoteFilter: true }
                    ]
                } />
        </useScreen.View>
    </>
}

export default PrizeTypesDefinitionPage