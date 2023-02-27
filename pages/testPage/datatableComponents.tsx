import { useCallback, useMemo } from "react";
import { CheckboxProps, DateProps, iFormProps, InputNumberProps, InputProps, ITabMainProps, RadioProps, SelectProps, Nar, CodeValueProps } from "nar-ui-library";
import { ControllerType } from "nar-ui-library";


const DatatableComponents = () => {

  let Screen = Nar.Screen.useScreen();
  let TableData = Nar.Controller.useDataTable();
  return <>
    <Screen.View screencode="SCRCODE" screenname="DataTable SCREEN Sample">
      <TableData.View
        id="DataTable1"
        maxHeight={800}
        SearchForm={{
          onClick: (form) => {
            console.log(form.getValue());
          }
        }}
        data={[
          {
            "CheckBox": true, 
            "CodeValue": { label: "123", value: "123", data: null }, 
            "name": "SALTUK", 
            numberrange: { value: 123, currency: "TL" }, 
            currency: 252.14,
            date: "2022.08.30 8:30:11",
            time: "22:18:43"
          }
        ]}
        EditForm={{
          onEditMessage: (form) => {
            console.log(form.getValue());
            return form.getValue();
          }
        }}
        selectLoadExp={(row) => { return row.numberrange?.value > 5; }}
        header="SELAM DATA "
        selectableRows
        filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
        columns={
          [
            { dataKey: "CheckBox", columnName: "CheckBox", columnControllerType: ControllerType.Checkbox, isNotEdit: true },
            {
              dataKey: "CodeValue", columnName: "CodeValue", columnControllerType: ControllerType.CodeValue, columnControllerProps: {
                hookContextKey: "CacheKeyId",
                SearchApi: async (val) => { return { isSuccess: true, value: { data: val, value: val, label: "Label Text" } }; }
              } as CodeValueProps
            },
            { dataKey: "name", columnName: "name", columnControllerType: ControllerType.Input },
            { dataKey: "numberrange", columnName: "numberrange", columnControllerType: ControllerType.InputNumber, isNotEdit: true, columnControllerProps: { type: "currency", currencyOptions: ["TRY", "USD"] } },
            { dataKey: "currency", columnName: "currency", columnControllerType: ControllerType.InputNumber },
            { dataKey: "date", columnName: "date", columnControllerType: ControllerType.Date, columnControllerProps: { type: "datetime" } },
            { dataKey: "time", columnName: "time", columnControllerType: ControllerType.Date, isNotEdit: true, columnControllerProps: { type: "time" } }
          ]
        } />

    </Screen.View>
  </>;
};

export default DatatableComponents;