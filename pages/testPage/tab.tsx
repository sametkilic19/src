
import { useRef } from "react"
import { ITabMainRef, Nar, FormRef } from "nar-ui-library"
const TabScreen = () => {

    const TabRef = useRef<ITabMainRef>(null);
    const TabRef2 = useRef<ITabMainRef>(null);
    const form1 = useRef<FormRef>(null);

    const SampleEvent = (id: string) => {
        switch (id) {
            case "ChangeTab":
                TabRef.current?.SelectTab("Tab2");
                break;
            case "HideTab":
                TabRef.current?.hideTab("Tab2");
                break;
            case "GetProps":
                console.log(TabRef2.current?.getProps())
                break;
            default:
                break;
        }
    }

    return <>
        <Nar.Button isLabelHidden label="Btn Change Tab" id="ChangeTab" onClick={() => SampleEvent("ChangeTab")} />
        <Nar.Button isLabelHidden label="Btn Change Hide Tab1" id="HideTab" onClick={() => SampleEvent("HideTab")} />
        <Nar.Button isLabelHidden label="Btn Change GetProps" id="GetProps" onClick={() => SampleEvent("GetProps")} />
        <Nar.Tab.TabMain ref={TabRef} id="SELAM" isWizard>
            <Nar.Tab.TabPanel id="Tab1" name="Tab 1 Name"  >
                11
            </Nar.Tab.TabPanel>
            <Nar.Tab.TabPanel id="Tab2" name="Tab 2 Name"  >
                22
            </Nar.Tab.TabPanel>
        </Nar.Tab.TabMain>
        <hr />
        TEST Form
        <hr />
        <Nar.Button isLabelHidden label="Btn Change Tab" id="ChangeTab" onClick={() => console.log(form1.current?.getBaseController("Name1").getProps())} />
        <Nar.Form.FormView ref={form1} id="Form1" >
            <Nar.Tab.TabMain ref={TabRef2} id="SELAM2" isWizard>
                <Nar.Tab.TabPanel id="Tab12" name="Tab 1 Name"  >
                    <Nar.Controller.Input type="text" id="Name1" label="Name1"
                        onValid={(e) => { return { IsValid: e.getValue() == "1", ValidText: "Name1" } }} />
                </Nar.Tab.TabPanel>
                <Nar.Tab.TabPanel id="Tab22" name="Tab 2 Name"  >
                    <Nar.Controller.Input type="text" id="Name2" label="Name2"
                        onValid={(e) => { return { IsValid: e.getValue() == "1", ValidText: "Name2" } }} />
                </Nar.Tab.TabPanel>

                <Nar.Tab.TabPanel id="Tab23" name="Tab 3 Name"  >
                    <Nar.Controller.Input type="text" id="Name3" label="Name3"
                        onValid={(e) => { return { IsValid: e.getValue() == "1", ValidText: "Name2" } }} />
                </Nar.Tab.TabPanel>

                <Nar.Tab.TabPanel id="Tab24" name="Tab 4 Name"  >
                    <Nar.Controller.Input type="text" id="Name4" label="Name4"
                        onValid={(e) => { return { IsValid: e.getValue() == "1", ValidText: "Name4" } }} />
                </Nar.Tab.TabPanel>
            </Nar.Tab.TabMain>
        </Nar.Form.FormView>

        <hr />
        TEST Acordion Form
        <hr />

        <Nar.Accordion.Accordion id="SELAM2">
            <Nar.Accordion.AccordionPanel name="Accordion 1 Name"  >
                Accordion 1
            </Nar.Accordion.AccordionPanel> 
            <Nar.Accordion.AccordionPanel name="Accordion 2 Name"  >
                Accordion 2
            </Nar.Accordion.AccordionPanel>
        </Nar.Accordion.Accordion>
    </>

}

export default TabScreen
