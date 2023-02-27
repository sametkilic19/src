import { Nar, ControllerType } from "nar-ui-library";

const PageLangs = () => {

 
  let Screen = Nar.Screen.useScreen();

  let TableData2 = Nar.Controller.useDataTable();
  return (<div> 
    <Screen.View screencode="scr1" screenname="scr1">
      <Nar.Form.FormView id="form1" responsiveSize={{ col: 2 }}>
        <Nar.Controller.Input id="Input" label="Input" />
        <Nar.Controller.InputNumber id="InputNumber" label="InputNumber" />
        <Nar.Controller.Date id="Date" label="Date" />
        <Nar.Controller.Checkbox id="Checkbox" label="Checkbox" />
        <Nar.Controller.Radio id="Radio" label="Radio" options={[{ label: "1", value: 1 }]} />
        <Nar.Controller.Select id="Select" label="Select" options={[{ label: "1", value: 1 }]} spacer />
        <Nar.Button id="SaveButton" label="SaveButton" icon={{ iconName: Nar.IconName.AlignJustify }} />
      </Nar.Form.FormView>
      <TableData2.View
        id="DataTable1"
        selectLoadExp={(row) => { return row.numberrange?.value > 5 }}
        header="LangDataTable"
        selectableRows
        filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
        SearchForm={{
          onClick:()=>{
            /*
            */
          }
        }}
        EditForm={{
          onEditMessage: (form) => {
            console.log(form.getValue());
            return form.getValue();
          }  
        }}
        columns={
          [
            { dataKey: "CheckBox", columnName: "CheckBox", columnControllerType: ControllerType.Checkbox, isNotEdit: true },
            { dataKey: "name", columnName: "name", columnControllerType: ControllerType.Input },
            { dataKey: "phone", columnName: "phone", columnControllerType: ControllerType.Input },
            { dataKey: "email", columnName: "email", columnControllerType: ControllerType.Input, isNotEdit: true },
            { dataKey: "region", columnName: "region", columnControllerType: ControllerType.Input },
            { dataKey: "country", columnName: "country", columnControllerType: ControllerType.Input },
            { dataKey: "numberrange", columnName: "numberrange", columnControllerType: ControllerType.InputNumber, columnControllerProps: { type: "curreny" } },
            { dataKey: "currency", columnName: "currency", columnControllerType: ControllerType.InputNumber },
            { dataKey: "alphanumeric", columnName: "alphanumeric", columnControllerType: ControllerType.Input },
            { dataKey: "date", columnName: "date", columnControllerType: ControllerType.Date, columnControllerProps: { type: "datetime", spacer: true } },
            { dataKey: "time", columnName: "time", columnControllerType: ControllerType.Date, isNotEdit: true, columnControllerProps: { type: "time" } }
          ]
        } />

    </Screen.View></div>);
};

export default PageLangs;
