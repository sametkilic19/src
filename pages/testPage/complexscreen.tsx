import { useRef } from "react";
import { Nar, FormRef } from "nar-ui-library";
const PageComplexscreen = () => {
  let useScreen = Nar.Screen.useScreen();


  let form = useRef<FormRef>(null);

  let useForm = Nar.Form.useForm();
  let Table1 = Nar.Controller.useDataTable();
  const options = [
    { value: 'chocolate', label: 'Chocolate', data: { a: "baba" } },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return <>

  
    <useScreen.View screencode="SCRCODE" screenname="SCR ADI" responsiveSize={{ col: 2 }} onSaveClick={(e) => {
      e.setBlocking(true);
      setTimeout(() => {
        e.setBlocking(false);
      }, 5000);

    }}>  
    <Nar.Button id="btn1" label=" blocking test HIDE" icon={{ iconName: Nar.IconName.AlignJustify }}
      onClick={() => {
        useScreen.getController("Form2").setBlocking(true);
        useScreen.setBlocking(true);
        setTimeout(() => {
          useScreen.getController("Form2").setBlocking(false);
          useScreen.setBlocking(false);
        }, 1000);
      }} />
      <useForm.View id="Form" responsiveSize={{ col: 4 }}  >
        <Nar.Button id="btn1" label="GETDATA" icon={{ iconName: Nar.IconName.AlignJustify }}
          onClick={() => {
            console.log(useScreen.getValue());
          }} />
        <Nar.Button id="btn2" label="GETDATA" icon={{ iconName: Nar.IconName.AlignJustify }}
          onClick={() => {
            console.log(useForm.getValue());
          }} />
        <Nar.Button id="btn3" label="isValid" icon={{ iconName: Nar.IconName.AlignJustify }} spacer
          onClick={() => {
            console.log(useScreen.isValid());
          }} />
        <Nar.Controller.Select id="select1" isClearable isSearchable label="selam 1" defaultValue={{ value: 'vanilla', label: 'Vanilla' }} options={options} onValid={[(e) => { return { IsValid: e.getValue() != null && (e.getValue() as any).value == "chocolate", ValidText: "chocolate select" }; }]} />
        <Nar.Controller.Input id="input1" label="input1" type="textarea" />
        <Nar.Controller.Checkbox id="Checkbox" label="input1" defaultValue={true}
          onValid={[(e) => { return { IsValid: e.getValue() == true, ValidText: "SEC select" }; }]}
        />
      </useForm.View>
      <Nar.Form.FormView ref={form} id="Form2" responsiveSize={{ col: 2 }}  >
        <Nar.Button id="btn1" label="GETDATA" icon={{ iconName: Nar.IconName.AlignJustify }}
          onClick={() => {
            console.log(useScreen.getValue());
          }} />
        <Nar.Button id="btn2" label="GETDATA" icon={{ iconName: Nar.IconName.AlignJustify }}
          onClick={() => {
            console.log(form?.current?.getValue());
          }} />
        <Nar.Button id="btn3" label="isValid" icon={{ iconName: Nar.IconName.AlignJustify }} spacer
          onClick={() => {
            console.log(useScreen.isValid());
          }} />
        <Nar.Controller.Select id="select1" isClearable isSearchable label="selam 1" defaultValue={{ value: 'vanilla', label: 'Vanilla' }} options={options} onValid={[(e) => { return { IsValid: e.getValue() != null && (e.getValue() as any).value == "chocolate", ValidText: "chocolate select" }; }]} />
        <Nar.Controller.Input id="input1" label="input1" type="textarea" />
        <Nar.Controller.Checkbox id="Checkbox" label="input1" defaultValue={true}
          onValid={[(e) => { return { IsValid: e.getValue() == true, ValidText: "SEC select" }; }]}
        />
      </Nar.Form.FormView>
      <Nar.Controller.DataTable
        id="DataTable1"
        maxHeight={500}
        isformcontroller
        returntype="data"
        SearchForm={{
          onClick: (form) => {
            console.log(form.getValue());
            form.setBlocking(true);
            setTimeout(() => {
              form.setBlocking(false);
            }, 1000);
          }
        }}
        selectLoadExp={(row) => { return row.numberrange?.value > 5; }}
        header="SELAM DATA "
        data={[{}]}
        selectableRows
        filterType={"multiple"} editmode={"none"} filterTypeLabelExcelModeIsShow={true}
        columns={
          [{ dataKey: "region", columnName: "region" }]
        } />
      <Table1.View
        id="DataTable2"
        maxHeight={500}
        SearchForm={{
          onClick: (form) => {
            console.log(form.getValue());
          }
        }}
        selectLoadExp={(row) => { return row.numberrange?.value > 5; }}
        header="SELAM DATA "
        data={[{}]}
        selectableRows
        filterType={"multiple"} editmode={"none"} filterTypeLabelExcelModeIsShow={true}
        columns={
          [{ dataKey: "region", columnName: "region" }]
        } />
    </useScreen.View>
  </>;
};
export default PageComplexscreen;