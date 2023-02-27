
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
const WafraApprovalPage = () => {
    /**
     * Screen 
     */
    let useScreen = Nar.Screen.useScreen();
    /**
     * Kullanilan Data Table
     */

    let table = Nar.Controller.useDataTable();
    const IApproval = {
        onSaveClick: async (Screen: ScreenRef) => {
            let updateData = table.getValueAdvance().Value.Update;
            let insertData = table.getValueAdvance().Value.Insert;
            if (updateData.length > 0) {
                let updateProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/prizes/bulk",
                    blockElements: [table],
                    data: updateData
                })

                if (updateProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
                    return false;
                }
            }

            if (insertData.length > 0) {

                let insertProcess = await NarUtils.Request.Post({
                    url: "wafraapi/v1/management/prizes/bulk",
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
                        url: "wafraapi/v1/management/approvals/waitings",
                        blockElements: [form]
                    })
                    if (response.isSuccess == true) {
                        if (response.data.length == 0) {
                            Nar.Modal.Alert("Response Error", "OnaydaBekleyenIslemBulunamadi", "Ok");
                        } else {
                            table.setValue(response.data);
                        }

                    } else {
                        Nar.Modal.Alert("Response Error", response.messagetype + " " + response.message, "Ok");
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
                        { objectName: "approvalId", objectType: "Input", props: ({ id: "approvalId", label: "approvalId", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }] } as InputProps) },
                        { objectName: "status", objectType: "Input", props: ({ id: "status", label: "status", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }] } as InputProps) }
                    ]
                }
            }
        }
    }
    return <>
        <useScreen.View screencode="Prizes" screenname="Onay Bekleyenler" saveType={SaveType.disable} onSaveClick={IApproval.onSaveClick}>
            <table.View
                id="PrizeTypeDefDataTable"
                maxHeight={800}
                SearchForm={IApproval.SearchForm()}
                EditForm={IApproval.EditForm()}
                expandableRowsComponent={(e) => {
                    return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
                }}
                filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
                columns={
                    [
                        { dataKey: "id", columnName: "userCode", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "readableCode", columnName: "prizeTypeCode", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "type", columnName: "deliverDate", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "createdUser", columnName: "quantity", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "approver", columnName: "approver", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "approvalId", columnName: "approvalId", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "detail", columnName: "detail", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "status", columnName: "status", columnControllerType: ControllerType.Input, isNotRemoteFilter: true }
                    ]
                } />
        </useScreen.View>
    </>
}

export default WafraApprovalPage