import { useEffect } from "react"
import { RenderProps, Nar, iFormProps, InputNumberProps, DateProps, SelectProps, RadioProps, CheckboxProps, ITabMainProps, ITabPanelProps } from "nar-ui-library"
const PageRender = () => {


    let viewSample: RenderProps = {
        RenderData: {
            objectName: "Form1", objectType: "Form", props: ({ id: "Frm1", responsiveSize: { col: 1 } } as iFormProps),
            children: [
                {
                    objectName: "TabMain", objectType: "TabMain", props: ({ id: "TabMain", isWizard: true } as ITabMainProps),
                    children: [
                        {
                            objectName: "Tab1", objectType: "TabPanel", props: ({ id: "Tab1", name: "Tab1", responsiveSize: { col: 2 } } as ITabPanelProps),
                            children: [
                                { objectName: "Input2", objectType: "InputNumber", props: ({ id: "Input2", label: "Label2", defaultValue: { value: 10.10, currency: "$" } } as InputNumberProps) },
                                { objectName: "Input3", objectType: "Date", props: ({ id: "Input3", label: "date", type: "date" } as DateProps) },
                                { objectName: "Input4", objectType: "Date", props: ({ id: "Input4", label: "datetime", type: "datetime" } as DateProps) },
                                { objectName: "Input5", objectType: "Date", props: ({ id: "Input5", label: "time", type: "time" } as DateProps) }
                            ]
                        },
                        {
                            objectName: "Tab2", objectType: "TabPanel", props: ({ id: "Tab2", name: "Tab2", responsiveSize: { col: 2 } } as ITabPanelProps),
                            children: [
                                { objectName: "Input3range", objectType: "Date", props: ({ id: "Input3range", label: "date", type: "date", mode: "range" } as DateProps) },
                                { objectName: "Input4range", objectType: "Date", props: ({ id: "Input4range", label: "datetime", type: "datetime", mode: "range" } as DateProps) },
                                { objectName: "Input5range", objectType: "Date", props: ({ id: "Input5range", label: "time", type: "time", mode: "range" } as DateProps) },
                                { objectName: "Select", objectType: "Select", props: ({ id: "Input5", label: "Select", options: [{ value: 1, label: "1" }], defaultValue: { value: 1, label: "2" } } as SelectProps) },
                                { objectName: "Radio", objectType: "Radio", props: ({ id: "Radio", label: "Radio", options: [{ value: 1, label: "1" }, { value: 2, label: "2" }], defaultValue: { value: 1, label: "1" } } as RadioProps) },
                                { objectName: "Checkbox", objectType: "Checkbox", props: ({ id: "Checkbox", label: "Checkbox", defaultValue: true, responsive: { lg: 1, md: 1, sm: 12, xl: 1, xs: 12 } } as CheckboxProps) }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    let AutoRender = Nar.AutoRender(viewSample); 
    useEffect(() => {
        console.log(AutoRender.getForm().getValue());
    }) 
    return <>
        {<AutoRender.View />}
    </>
}

export default PageRender

