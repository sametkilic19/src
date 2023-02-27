import { Nar, FormRef, ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType, SelectProps } from "nar-ui-library"
import { NarUtils } from "nar-ui-utils";

/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */

export const cmbClentTypeData = [
    { value: 'ANDROID_ARM', label: "ANDROID_ARM" },
    { value: 'Android_ARMv7a', label: "Android_ARMv7a" },
    { value: 'Android_ARMv8a', label: "Android_ARMv8a" },
    { value: 'ANDROID_x86', label: "ANDROID_x86" },
    { value: 'iOS_ARM64', label: "iOS_ARM64" },
    { value: 'iOS_ARMv7', label: "iOS_ARMv7" },
    { value: 'iOS_ARMv7s', label: "iOS_ARMv7s" },
    { value: 'WindowsPhone_ARMV7', label: "WindowsPhone_ARMV7" },
    { value: 'WindowsPhone_Emu', label: "WindowsPhone_Emu" },
    { value: 'MAC_OS', label: "MAC_OS" },
    { value: 'signDot', label: "signDot" },
    { value: 'signPod', label: "signPod" },
    { value: 'WINDOWS', label: "WINDOWS" }
]
export const cmbAppNameData = [
    { value: 'AlbaFX', label: "AlbaFX" },
    { value: 'AlbarakaApp', label: "AlbarakaApp" }
]


//  const insideEffect.EditInsertModal = async (row, type) => {

//     insideEffect.editModal.setBody(<ReturnModal.ModalForm.View />)
//     insideEffect.editModal.isOpen
//     insideEffect.editModal.isOpen(true).then(async () => {
//         let form = ReturnModal.ModalForm.getForm();
//         //form.setBlocking(true);
//         setTimeout(() => {
//             let HideName: string[] = [];
//             if (props?.EditForm?.formComponents == null) {
//                 if (ProcessType.Insert == type) {
//                     HideName = props.columns.filter(t => t.isNotInsert === true).map(t => t.columnName);
//                 } else {
//                     HideName = props.columns.filter(t => t.isNotEdit === true).map(t => t.columnName);
//                 }

//                 let keys = Object.keys(form.getControllers());
//                 for (let index = 0; index < keys.length; index++) {
//                     let element = keys[index];
//                     let row = form.getBaseController(element);
//                     if (row?.isDisable?.() == true && HideName.filter(x => x == element).length == 0) {
//                         row.setDisable?.(false);
//                     } else if (HideName.filter(x => x == element).length > 0) {
//                         row.setDisable?.(true);
//                     }

//                 }
//             }
//             let updateRow = row;
//             if (props.EditForm?.onEditModalOpenDataFormat != null) {
//                 updateRow = { ...props.EditForm.onEditModalOpenDataFormat(row, form, ProcessType[type] as any) };
//             }
//             Object.keys(row).map(key => {
//                 if (updateRow[key] == null)
//                     delete updateRow[key];
//             })
//             form.setHiddenData({ row: row, type: type });
//             form.setValue(updateRow);
//         }, 100);


//     })
// }

const SSMSVersionDefinition = () => {
    /**
     * Screen 
     */
    let useScreen = Nar.Screen.useScreen();
    /**
     * Kullanilan Data Table
     */

    let table = Nar.Controller.useDataTable();
    const ISSMSVersionDefinition = {
        onSaveClick: async (Screen: ScreenRef) => {
            let updateData = table.getValueAdvance().Value.Update;
            let insertData = table.getValueAdvance().Value.Insert;
            if (updateData.length > 0) {
                let updateProcess =
                    await NarUtils.Request.Put({
                        url: "wafraapi/v1/management/prize-types",
                        blockElements: [table],
                        data: updateData
                    })

                if (updateProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
                    return false;
                }
            }
            if (insertData.length > 0) {

                let insertProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/prize/bulk",
                    blockElements: [table],
                    data: insertData
                })
                if (insertProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", insertProcess.messagetype + " " + insertProcess.message, "Ok");
                    return false;
                }
            }
            return true;
        },
        SearchForm: (): DataTableSearchForm => {
            return {
                onClick: async (form) => {
                    let response = await NarUtils.Request.Get<any[]>({
                        url: "/guard/api/application-version/package/"+form.getValue().packageName,
                        blockElements: [form],
                        data: form.getValue()
                    })
                    if (response.isSuccess == true) {


                        table.setValue(response.data);
                    } else {
                        Nar.Modal.Alert("Response Error", response.messagetype + " " + response.message, "Ok");
                    }
                }
            }
        },
        EditForm: (): DataTableEditForm => {
            return {
                onEditMessage: (form) => {
                    console.log(form.getValue());
                    let data = form.getValue();
                    return data;
                }
            }
        }
    }
    return <>
        <useScreen.View screencode="Versions" screenname="SSMS Versions" saveType={SaveType.disable} onSaveClick={ISSMSVersionDefinition.onSaveClick}>
            <table.View
                id="PrizeTypeDefDataTable"
                maxHeight={800}
                SearchForm={ISSMSVersionDefinition.SearchForm()}
                EditForm={ISSMSVersionDefinition.EditForm()}

                expandableRowsComponent={(e) => {
                    return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
                }}

                header="Versions"
                filterType={"single"}
                editmode={"modal"} //Add Record butonu
                //filterTypeLabelExcelModeIsShow={true}
                //isNotDelete={false}
                selectableRows={true}

                columns={[
                    { dataKey: "SoftwareType", columnName: "SoftwareType", columnControllerType: ControllerType.Input, isNotRemoteFilter: true, isHidden: true },
                    { dataKey: "clientType", columnName: "ClientType", columnControllerType: ControllerType.Select, isNotRemoteFilter: true, columnControllerProps: { id: "ClentType", options: cmbClentTypeData, returntype: "value" } as SelectProps },
                    { dataKey: "packageName", columnName: "AppName", columnControllerType: ControllerType.Select, isNotRemoteFilter: true, columnControllerProps: { id: "AppName", options: cmbAppNameData, returntype: "value" } as SelectProps },
                    { dataKey: "version", columnName: "Version", columnControllerType: ControllerType.Input, isNotRemoteFilter: false },
                    { dataKey: "adminCustomerId", columnName: "AdminCustomerId", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                    { dataKey: "registerFlag", columnName: "RegisterFlag", columnControllerType: ControllerType.Input, isNotRemoteFilter: true, isNotInsert: true },
                    { dataKey: "integrityChecked", columnName: "IntegrityChecked", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                    { dataKey: "createdAt", columnName: "CreateTime", columnControllerType: ControllerType.Input, isNotRemoteFilter: true, isNotInsert: true },
                    { dataKey: "CreateUserId", columnName: "CreateUserId", columnControllerType: ControllerType.Input, isNotRemoteFilter: true, isNotInsert: true },
                    { dataKey: "updatedAt", columnName: "Updatetime", columnControllerType: ControllerType.Input, isNotRemoteFilter: true, isNotInsert: true },
                    { dataKey: "UpdateUserId", columnName: "UpdateUserId", columnControllerType: ControllerType.Input, isNotRemoteFilter: true, isNotInsert: true }


                    ]
                }
            />
        </useScreen.View>
    </>
}

export default SSMSVersionDefinition