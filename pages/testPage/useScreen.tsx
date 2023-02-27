import { useRef } from "react";
import { Nar, FormRef } from "nar-ui-library";
const PageUseScreen = () => {
  let form = useRef<FormRef>(null);

  let UseForm = Nar.Form.useForm();
  let Screen = Nar.Screen.useScreen();
  const options = [
    { value: 'chocolate', label: 'Chocolate', data: { a: "baba" } },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const SampleEvent = {
    GetData: () => {
      console.log(Screen.getValue());
    },
    isValid: () => {
      console.log(Screen.isValid());
    },
    FormValue: () => {
      console.log(UseForm.getValue());
    }
  };

  return (<Screen.View screencode="SCRCODE" screenname="SAMPLE SCREEN" responsiveSize={{ col: 2 }}>
    <UseForm.View id="Form" header={"HEADER 1"}  responsiveSize={{ col: 4 }}>
      <Nar.Button id="btn2" label={"Form GETDATA"} icon={{ iconName: Nar.IconName.AlignJustify }} onClick={SampleEvent.FormValue} />
      <Nar.Button id="btn1" label={"Screen GETDATA"} icon={{ iconName: Nar.IconName.AlignJustify }} onClick={SampleEvent.GetData} />
      <Nar.Button id="btn3" label={"isValid"} icon={{ iconName: Nar.IconName.AlignJustify }} spacer onClick={SampleEvent.isValid} />
      <Nar.Controller.Select id="select1" isClearable isSearchable label="selam 1" defaultValue={{ value: 'vanilla', label: 'Vanilla' }} options={options} onValid={[(e) => { return { IsValid: e.getValue() != null && (e.getValue() as any).value == "chocolate", ValidText: "chocolate select" }; }]} />
      <Nar.Controller.Input id="input1" label="input1" type="textarea" />
      <Nar.Controller.Checkbox id="Checkbox" label="input1" defaultValue={true}
        onValid={[(e) => { return { IsValid: e.getValue() == true, ValidText: "SEC select" }; }]}
      />
    </UseForm.View>


    <Nar.Form.FormView ref={form} id="Form2" header={"HEADER 2"} responsiveSize={{ col: 4 }}  >
      <Nar.Button id="btn1" label="GETDATA" icon={{ iconName: Nar.IconName.AlignJustify }}
        onClick={() => {
          console.log(Screen.getValue());
        }} />
      <Nar.Button id="btn2" label="GETDATA" icon={{ iconName: Nar.IconName.AlignJustify }}
        onClick={() => { console.log(form.current.getValue()); }} />
      <Nar.Button id="btn3" label="isValid" icon={{ iconName: Nar.IconName.AlignJustify }} spacer
        onClick={() => {
          console.log(Screen.isValid());
        }} />
      <Nar.Controller.Select id="select1" isClearable isSearchable label="selam 1" defaultValue={{ value: 'vanilla', label: 'Vanilla' }} options={options} onValid={[(e) => { return { IsValid: e.getValue() != null && (e.getValue() as any).value == "chocolate", ValidText: "chocolate select" }; }]} />
      <Nar.Controller.Input id="input1" label="input1" type="textarea" />
      <Nar.Controller.Checkbox id="Checkbox" label="input1" defaultValue={true}
        onValid={[(e) => { return { IsValid: e.getValue() == true, ValidText: "SEC select" }; }]}
      />
    </Nar.Form.FormView>
  </Screen.View>);
};

export default PageUseScreen;
