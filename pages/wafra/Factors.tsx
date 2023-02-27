import _ from "lodash";
import { iFormProps, Nar, IDataTableProps, InputProps, SelectProps, FormRef, ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType, CheckboxProps, ISelectRef } from "nar-ui-library"
import { NarUtils } from "nar-ui-utils";

/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */
export const cmbStatusData = [
  { value: 'Active', label: "Active" },
  { value: 'Passive', label: "Passive" }
]
const FactorsPage = () => {
  let useScreen = Nar.Screen.useScreen();
  let table = Nar.Controller.useDataTable();
  const IFactors = {
    onSaveClick: async (Screen: ScreenRef) => {
      let insertData = table.getValueAdvance().Value.Insert;
      let deleteData = table.getValueAdvance().Value.Delete;
      let updateData = table.getValueAdvance().Value.Update;
      if (Object.keys(insertData).length > 0) {
        if (!IFactors.InsertDatas()) {
          return false;
        }
      }
      if (Object.keys(deleteData).length > 0) {
        if (!IFactors.DeleteDatas()) {
          return false;
        }
      }
      if (Object.keys(updateData).length > 0) {
        if (!IFactors.UpdateDatas()) {
          return false;
        }
      }
      return true;
    },
    SearchForm: (): DataTableSearchForm => {
      return {
        onClick: async (form) => {
          let responseApi = await NarUtils.Request.Get<any[]>({
            url: "wafraapi/v1/management/valuations/factors"
          })
          if (responseApi.isSuccess == true) {
            table.setValue(responseApi.data);
          } else {
            Nar.Modal.Alert("Response Error", responseApi.messagetype + " " + responseApi.message, "Ok");
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
            { objectName: "code", objectType: "Input", props: ({ id: "code", label: "code", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }] } as InputProps) },
            { objectName: "name", objectType: "Input", props: ({ id: "name", label: "name", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }] } as InputProps) },
            { objectName: "description", objectType: "Input", props: ({ id: "description", label: "description", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz " } }] } as InputProps) }
           ]
        }
      }
    },
    GetFactors: async (relatedValue: any, that: ISelectRef) => {

      const res = await NarUtils.Request.Get<any[]>({
        url: "Factors/v1/applications"
      });
      let data: any = [];
      if (res.isSuccess == true) {
        data = (res.data ?? []).map(t => {
          return { label: t.description, value: t.applicationId, data: t }
        })
      }

      return {
        options: data,
        message: res.messagetype,
        messagetype: res.messagetype,
        isSuccess: res.isSuccess
      };

    },
    InsertDatas: async () => {

      let insertData = table.getValueAdvance().Value.Insert;
      let irequest = {
        code: insertData[0].code,
        name: insertData[0].name,
        description: insertData[0].description
      }

      let insertProcess = await NarUtils.Request.Post({
        url: "wafraapi/v1/management/valuations/factors",
        blockElements: [table],
        data: irequest
      })

      if (insertProcess.isSuccess == false) {
        Nar.Modal.Alert("Response Error", insertProcess.messagetype + " " + insertProcess.message, "Ok");
        return false;
      } else {
        Nar.Modal.Alert("IslemBasarili", "KayitEklendi", "Ok");
      }
      return true;
    },
    UpdateDatas: async () => {
      let updateData = table.getValueAdvance().Value.Update;

      //Factors;
      let irequestUpdate = {
        name: updateData[0].name,
        description: updateData[0].description,
        status: updateData[0].status
      }

      let updateProcess = await NarUtils.Request.Put({
        url: "wafraapi/v1/management/valuations/factors/" + updateData[0].code,
        blockElements: [table],
        data: irequestUpdate
      })
      console.log(updateProcess)
      if (updateProcess.isSuccess == false) {
        Nar.Modal.Alert("Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
        return false;
      }
      else {
        Nar.Modal.Alert("IslemBasarili", "Güncellendi", "Ok");
      }
      return true;

    },
    DeleteDatas: async () => {

      let deleteData = table.getValueAdvance().Value.Delete;
      console.log(table.getValueAdvance().Value);
      deleteData.forEach(async element => {
        let irequest = {
          name: element.name,
          description: element.description,
          status: "Passive"
        }
        let deleteProcess = await NarUtils.Request.Put({
          url: "wafraapi/v1/management/valuations/factors/" + element.code,
          blockElements: [table],
          data: irequest
        })

        if (deleteProcess.isSuccess == false) {
          Nar.Modal.Alert("Response Error", deleteProcess.messagetype + " " + deleteProcess.message, "Ok");
          return false;
        }
        else {
          Nar.Modal.Alert("Response Error", "KayitSilinmistir", "Ok");
        }
      });
      return true;
    },
    DataLoading: async () => {
      let responseApi = await NarUtils.Request.Get<any[]>({
        url: "wafraapi/v1/management/valuations/factors"
      })
      if (responseApi.isSuccess == true) {
        table.setValue(responseApi.data);
      } else {
        Nar.Modal.Alert("Response Error", responseApi.messagetype + " " + responseApi.message, "Ok");
      }
    }
  }
  Nar.StartEvent(() => {
    IFactors.DataLoading();
  })
  return <>

    <useScreen.View screencode="Factors" screenname="Değerleme Parametre Tanım Ekranı" saveType={SaveType.none} onSaveClick={IFactors.onSaveClick} onLoad={() => {
      IFactors.DataLoading();
    }}>
      <table.View
        id="PrizeTypeDefDataTable"
        maxHeight={800}
        EditForm={IFactors.EditForm()}
        filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
        columns={
          [
            {
              dataKey: "code", columnName: "code", isNotRemoteFilter: true, isNotEdit: true, dataViewKey: "code", columnControllerType: ControllerType.Select, columnControllerProps: {
                id: "code", ApiData: IFactors.GetFactors, hookContextKey: "code", returntype: "value"
              } as SelectProps
            },
            { dataKey: "name", columnName: "name", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
            { dataKey: "description", columnName: "description", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
            { dataKey: "status", columnName: "status", columnControllerType: ControllerType.Select, isNotRemoteFilter: true, columnControllerProps: { id: "status", options: cmbStatusData, returntype: "value" } as SelectProps }

          ]
        } />
    </useScreen.View>
  </>
}

export default FactorsPage