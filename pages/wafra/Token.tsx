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
const TransferPage = () => {
  let useScreen = Nar.Screen.useScreen();
  let table = Nar.Controller.useDataTable();
  const IToken = {
    onSaveClick: async (Screen: ScreenRef) => {
      let insertData = table.getValueAdvance().Value.Insert;
      let deleteData = table.getValueAdvance().Value.Delete;
      let updateData = table.getValueAdvance().Value.Update;
      if (Object.keys(insertData).length > 0) {
        if (!IToken.InsertDatas()) {
          return false;
        }
      }
      if (Object.keys(deleteData).length > 0) {
        if (!IToken.DeleteDatas()) {
          return false;
        }
      }
      if (Object.keys(updateData).length > 0) {
        if (!IToken.UpdateDatas()) {
          return false;
        }
      }
      return true;
    },
    SearchForm: (): DataTableSearchForm => {
      return {
        onClick: async (form) => {
          Nar.Modal.Alert("IslemBasarili", "getServisiHenüzYok", "Ok");
          return
          let responseApi = await NarUtils.Request.Get<any[]>({
            url: "wafraapi/v1/management/valuations/Token"
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
            { objectName: "quantity", objectType: "Input", props: ({ id: "quantity", label: "quantity", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }] } as InputProps) },
            { objectName: "explanation", objectType: "Input", props: ({ id: "explanation", label: "explanation", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }] } as InputProps) }
             ]
        }
      }
    },
    GetToken: async (relatedValue: any, that: ISelectRef) => {

      const res = await NarUtils.Request.Get<any[]>({
        url: "wafraapi/v1/management/tokens/mint"
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

      let insertProcess = await NarUtils.Request.Post({
        url: "wafraapi/v1/management/tokens/mint",
        blockElements: [table],
        data: insertData[0]
      })

      if (insertProcess.isSuccess == false) {
        Nar.Modal.Alert("Response Error", insertProcess.messagetype + " " + insertProcess.message, "Ok");
        return false;
      } else {
        Nar.Modal.Alert("IslemBasarili", "TokenEklendi", "Ok");
      }
      return true;
    },
    UpdateDatas: async () => {
      let updateData = table.getValueAdvance().Value.Update;

      //Token;
      let irequestUpdate = {
        name: updateData[0].name,
        description: updateData[0].description,
        status: updateData[0].status
      }

      let updateProcess = await NarUtils.Request.Put({
        url: "wafraapi/v1/management/valuations/Token/" + updateData[0].code,
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
   
      let deleteProcess = await NarUtils.Request.Delete({
        url: "wafraapi/v1/management/tokens/burn",
        data: deleteData[0]
      })
      if (deleteProcess.isSuccess == false) {
        Nar.Modal.Alert("Response Error", deleteProcess.messagetype + " " + deleteProcess.message, "Ok");
        return false;
      }
      else {
        Nar.Modal.Alert("IslemBasarili", "TokenSilindi", "Ok");
      }

      return true;
    }
  }
  return <>
    <useScreen.View screencode="Token" screenname="Token Üretme/Silme/İzleme ekranı" saveType={SaveType.disable} onSaveClick={IToken.onSaveClick}>
      <table.View
        id="PrizeTypeDefDataTable"
        maxHeight={800}
        SearchForm={IToken.SearchForm()}
        EditForm={IToken.EditForm()}
        expandableRowsComponent={(e) => {
          return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
        }}
        filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
        columns={
          [
            { dataKey: "quantity", columnName: "quantity", columnControllerType: ControllerType.Input, isNotRemoteFilter: true, isNotEdit: true },
            { dataKey: "explanation", columnName: "explanation", columnControllerType: ControllerType.Input, isNotRemoteFilter: true }       
          ]
        } />
    </useScreen.View>
  </>
}

export default TransferPage