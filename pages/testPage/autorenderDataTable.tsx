import { useEffect, useRef } from "react"
import { IDateRef, RenderProps, Nar, iScreenProps, iFormProps, InputProps, InputNumberProps, DateProps, SelectProps, RadioProps, CheckboxProps, IDataTableProps, ControllerType, ITabMainProps, ITabPanelProps } from "nar-ui-library"
const PageAutorenderDataTable = () => {


    let viewSample: RenderProps = {
        RenderData: { key: "Screen0", title: "scr1", objectName: "asdasdsdfdf", objectType: "Screen", props: { screencode: "scfsdsd2", alert: true, spacer: false, responsiveSize: {}, responsive: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }, children: [{ key: "Form0", title: "Form1", objectName: "Form1", objectType: "Form", props: { name: "Form 1", alert: false, spacer: false }, children: [{ key: "TabMain0", title: "tbl1", objectName: "tbl1", objectType: "TabMain", props: { id: "Tab1", SelectTabId: "Tab1", isWizard: false, isVertical: false, hidden: false, disabled: false, spacer: false }, children: [{ key: "TabPanel1", title: "tbl2", objectName: "tbl2", objectType: "TabPanel", props: { id: "Tab1", name: "Tab1", hidden: false, disabled: false, responsiveSize: {} }, children: [{ key: "Input1", title: "Input1", objectName: "Input1", objectType: "DataTable", props: { id: "Int1", name: "aa", header: "aaaa", filterType: "multiple", editmode: "modal", selectableRows: true, returntype: "advance", columns: [{ dataKey: "c", columnName: "c", columnIndex: 3, columnControllerType: "Select", isHidden: false, isNotEdit: false, isNotFilter: false, isNotInsert: false, isNotSort: false }, { dataKey: "b", columnName: "b", columnIndex: 2, columnControllerType: "Date", isHidden: false, isNotEdit: false, isNotFilter: false, isNotInsert: false, isNotSort: false, columnControllerProps: { id: "", type: "time", mode: "single", bsSize: "sm", enableSeconds: false, isHideClearButton: false, isOpenButtonHide: false, label: "", placeholder: "", hidden: false, disabled: false } }, { dataKey: "a", columnName: "a", columnIndex: 1, columnControllerType: "Input", isHidden: false, isNotEdit: false, isNotFilter: false, isNotInsert: false, isNotSort: false }], label: "label ", placeholder: "label ", hidden: false, disabled: false, spacer: false, data: [[], [], []] }, children: [] }] }, { key: "TabPanel2", title: "tbl3", objectName: "tbl3", objectType: "TabPanel", props: { id: "Tab12", name: "2Tab1", hidden: false, disabled: false, spacer: false }, children: [{ key: "Input0", title: "Input2", objectName: "Input2", objectType: "Radio", props: { returntype: "object", options: [{ value: "1", label: "1" }, { value: "2", label: "2" }], id: "Label2", label: "Label 2", placeholder: "Label 2", hidden: false, disabled: false, spacer: false }, children: [] }] }] }] }] } as any,
        onRender: (props) => {
            if (props.objectName == "Input1") {
                // (props.props as IDataTableProps).EditForm={
                //     event(form, that, data) { 
                //         return form.getValue();
                //     },
                // }
            }

            return props.props
        }
    };

    let AutoRender = Nar.AutoRender(viewSample);
    
    useEffect(() => {
        console.log(AutoRender.getForm().getValue());
    });

    return <>
        {<AutoRender.View />}
    </>
} 
export default PageAutorenderDataTable

