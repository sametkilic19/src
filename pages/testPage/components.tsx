import { useRef, useState } from "react";
import { Nar, FormRef, IInputNumberRef } from "nar-ui-library";
const PageComponents = () => {


  let [blocking] = useState(false);

  let form = useRef<FormRef>(null);
  let number1 = useRef<IInputNumberRef>(null);
  let data = Nar.Context.get("key1");
  console.log(data);
  let useForm = Nar.Form.useForm();
  const options = [
    { value: 'chocolate', label: 'Chocolate', data: { a: "baba" } },
    // { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
    // { value: 'vanilla2', label: 'Vanilla 2' },
    // { value: 'vanilla3', label: 'Vanilla 3' } 
  ];

  return <>
    <Nar.Button id="btn1" label=" blocking test HIDE" icon={{ iconName: Nar.IconName.AlignJustify }}
      onClick={() => {
        blocking = !blocking;
        useForm.setBlocking(blocking);
      }} />
    <useForm.View id="Form1" responsiveSize={{ col: 4 }}  >
      <Nar.Button id="btn1" label="btn1 HIDE" icon={{ iconName: Nar.IconName.AlignJustify }}
        onClick={() => {
          console.log(useForm.getValue());
          return;
          form.current?.getBaseController?.("name1").setHide();
          form.current?.getBaseController?.("name2").setHide();
        }} />
      <Nar.Button id="btn2" label="GETDATA" icon={{ iconName: Nar.IconName.AlignJustify }}
        onClick={() => {
          console.log(form.current?.getValue());
        }} />
      <Nar.Button id="btn3" label="isValid" icon={{ iconName: Nar.IconName.AlignJustify }} spacer
        onClick={() => {
          console.log(useForm.isValid?.());
        }} />
      <Nar.Button id="btn4" label="setNumber Value" icon={{ iconName: Nar.IconName.AlignJustify }} spacer
        onClick={() => {
          useForm.getBaseController?.("InputNumber").setValue({ value: 934324230.91, currency: "TL" });
          useForm.getNumberInputController?.("InputNumber").setCurrencyOptions(["AR", 'TL', 'USD']);
        }} />
      <Nar.Controller.Select id="select1" isMulti isClearable isSearchable label="selam 1" defaultValue={{ value: 'vanilla', label: 'Vanilla' }} options={options} onValid={[(e) => { return { IsValid: e.getValue() != null && (e.getValue() as any).value == "chocolate", ValidText: "chocolate select" }; }]} />
      <Nar.Controller.Input id="input1" label="input1" type="textarea" popover={{ body: "BODY TEXT", header: "HEADER TEXT" }} />

      <Nar.Controller.Date id="time" type={"time"} label="time" placeholder="time" enableSeconds onValid={(e) => { return { IsValid: false, ValidText: "selam1" }; }} popover={{ body: "BODY TEXT time", header: "HEADER TEXT" }} />
      <Nar.Controller.Date id="daterenage" type={"date"} mode={"range"} label="daterenage" disabled />
      <Nar.Controller.Date id="date" type={"date"} label="date" />
      <Nar.Controller.Date id="datetime" type={"datetime"} enableSeconds label="datetime" />
      <Nar.Controller.Date id="datetimerange" type={"datetime"} mode={"range"} enableSeconds label="datetimerange" />
      <Nar.Controller.Radio position="horizontal" id="Radio1" label="Radio 1" defaultValue={{ value: 'vanilla', label: 'Vanilla' }} options={options} onValid={[(e) => { return { IsValid: e.getValue() != null && (e.getValue() as any).value == "chocolate", ValidText: "chocolate select" }; }]} popover={{ body: "BODY TEXT radio", header: "HEADER TEXT" }} />
      <Nar.Controller.InputNumber id={"InputNumber"} defaultValue={{ value: 50, currency: "TL" }} label="Sayi Giriniz" currencyOptions={['TL']} onValid={(e) => { return { IsValid: (e.getValue().value ?? 0) > 10 || e.getValue().value == null, ValidText: "10dan buyuk gir" }; }} />


      <Nar.Controller.InputNumber id={"InputNumber"} ref={number1} defaultValue={{ Start: 50, Stop: 51, currency: "TL" }} label="Range Sayi Giriniz" mode="range" />
      <Nar.Controller.InputNumber id={"InputNumber"} ref={number1} defaultValue={{ value: 34 }} currencyOptions={["USD", "TRY", "EUR"]} label=" Sayi Giriniz Only" />
      {/* <Nar.Controller.InputNumber id={"InputNumber"} ref={number1} defaultValue={{ value: 2032434.34, currency: "TL" }} label="Range Sayi Giriniz" /> */}

      <Nar.Button id="btn4" label="setNumber Value" icon={{ iconName: Nar.IconName.AlignJustify }} spacer
        onClick={() => {
          console.log(number1.current?.setValue({ Start: 10.2, Stop: 2123230.4, currency: "TL" }));
          // console.log(number1.current?.setValue({ value: 34, currency: "USD" }))

          console.log(number1.current?.getValue());
        }} />

      <Nar.Controller.Slider range={{ min: 20, max: 100 }} defaultValue={[25, 45]} id="deneme" 
      step={5} label="Slider 1" 
      tooltips
      />
      <Nar.Controller.Checkbox id="Checkbox" label="input1" defaultValue={null} indeterminate spacer
        onValid={[(e) => { return { IsValid: e.getValue() == true, ValidText: "SEC select" }; }]}
      />
      <Nar.Button id="btn4" label="Text1 setHide" icon={{ iconName: Nar.IconName.AlignJustify }}
        onClick={() => {
          useForm.getBaseController?.("Text1").setHide();
        }} />
      <Nar.Button id="btn4" label="Text1 setValue" icon={{ iconName: Nar.IconName.AlignJustify }}
        onClick={() => {
          useForm.getBaseController?.("Text1").setValue("SELAM 1");
        }} />
      <Nar.Controller.Text id="Text1" label="Text1_input1" labellangformat={async (e) => { return e + " _ DATA" }} />
    </useForm.View>
  </>;
};

export default PageComponents;
