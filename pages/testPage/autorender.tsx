import { useEffect } from "react"
import { RenderProps, Nar } from "nar-ui-library"
const PageAutorender = () => {
	
	const viewSample: RenderProps = {
		RenderData: { key: "Screen0", title: "scr1", objectName: "scr1", objectType: "Screen", props: { screencode: "SCR1", alert: true, spacer: false, responsiveSize: {}, responsive: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }, children: [{ key: "Form0", title: "Form1", objectName: "Form1", objectType: "Form", props: { name: "Form 1", alert: false, spacer: false }, children: [{ key: "TabMain0", title: "tbl1", objectName: "tbl1", objectType: "TabMain", props: { id: "Tab1", SelectTabId: "Tab1", isWizard: false, isVertical: false, hidden: false, disabled: false, spacer: false }, children: [{ key: "TabPanel1", title: "tbl2", objectName: "tbl2", objectType: "TabPanel", props: { id: "Tab1", name: "Tab1", hidden: false, disabled: false, responsiveSize: {} }, children: [{ key: "Input1", title: "Input1", objectName: "Table1", objectType: "DataTable", props: { id: "Int1", header: "", filterType: "multiple", editmode: "excel", selectableRows: true, returntype: "advance", columns: [{ dataKey: "c", columnName: "c", columnIndex: 1, columnControllerType: "InputNumber", isHidden: false, isNotEdit: false, isNotFilter: false, isNotInsert: false, isNotSort: false }, { dataKey: "b", columnName: "b", columnIndex: 2, columnControllerType: "Date", isHidden: false, isNotEdit: false, isNotFilter: false, isNotInsert: false, isNotSort: false, columnControllerProps: { id: "", type: "time", mode: "single", bsSize: "sm", enableSeconds: false, isHideClearButton: false, isOpenButtonHide: false, label: "", placeholder: "", hidden: false, disabled: false } }, { dataKey: "a", columnName: "a", columnIndex: 3, columnControllerType: "Input", isHidden: false, isNotEdit: false, isNotFilter: false, isNotInsert: false, isNotSort: false }], label: "label ", placeholder: "label ", hidden: false, disabled: false, spacer: false, data: [[], [], []] }, children: [] }] }, { key: "TabPanel2", title: "tbl3", objectName: "tbl3", objectType: "TabPanel", props: { id: "Tab12", name: "2Tab1", hidden: false, disabled: false, spacer: false }, children: [{ key: "Input0", title: "Input2", objectName: "Input2", objectType: "Radio", props: { returntype: "object", options: [{ value: "1", label: "1" }, { value: "2", label: "2" }], id: "Label2", label: "Label 2", placeholder: "Label 2", hidden: false, disabled: false, spacer: false }, children: [] }] }] }] }] } as any
	};

	let AutoRender = Nar.AutoRender(viewSample);

	useEffect(() => {
		console.log(AutoRender.getScreen().getValue());
	})
	
	return <>
		<Nar.Button id="btn1" label=" blocking test HIDE" icon={{ iconName: Nar.IconName.AlignJustify }}
			onClick={() => {
				console.log(AutoRender.getScreen().getValue());
				AutoRender.getDataTable().setBlocking(true);
				setTimeout(() => {
					AutoRender.getDataTable().setBlocking(false);
				}, 1000);
			}} />
		{<AutoRender.View />}
	</>
}

export default PageAutorender

