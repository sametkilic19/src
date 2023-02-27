import _ from "lodash";
import { iFormProps, Nar, IDataTableProps, InputProps, SelectProps, FormRef, ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType, CheckboxProps, ISelectRef } from "nar-ui-library"
import { NarUtils } from "nar-ui-utils";
import { useState } from "react";

export const verbDataCombo = [
  { value: 'POST', label: "POST" },
  { value: 'PUT', label: "PUT" },
  { value: 'GET', label: "GET" },
  { value: 'DELETE', label: "DELETE" }
]

/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */

const ApiManagement = () => {
  /**
   * Screen 
   */
  let useScreen = Nar.Screen.useScreen();
  /**
   * Kullanilan Data Table
   */

  let table = Nar.Controller.useDataTable();
  const IApiManagement = {
    onSaveClick: async (Screen: ScreenRef) => {
      let updateData = table.getValueAdvance().Value.Update;
      let insertData = table.getValueAdvance().Value.Insert;
      let deleteData = table.getValueAdvance().Value.Delete;

      if (updateData.length > 0) {
        //ApiManagement;
        let irequestUpdate = {
          name: updateData[0].name,
          verb: updateData[0].verb,
          url: updateData[0].urlTemplate,
          isApproval: updateData[0].isApproval,
          isAnonymous: updateData[0].isAnonymous,
          isLogging: updateData[0].isLogging,
          version: updateData[0].version,
          scopes: [updateData[0].scopes[0].scopes],
          relations: updateData[0].relations ? [] : [
            {
              applicationId: updateData[0].applicationId,
              apiId: updateData[0].apiId ? updateData[0].apiId : 0
            }
          ]
        }

        let updateProcess = await NarUtils.Request.Put({
          url: "apimanagement/v1/applications/" + updateData[0].applicationId + "/apis/" + updateData[0].apiId,
          blockElements: [table],
          data: updateData[0]
        })
        console.log(updateProcess)
        if (updateProcess.isSuccess == false) {
          Nar.Modal.Alert("Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
          return false;
        }
      }
      if (insertData.length > 0) {

        let irequest = {
          name: insertData[0].name,
          verb: insertData[0].verb,
          url: insertData[0].urlTemplate,
          isApproval: insertData[0].isApproval,
          isAnonymous: insertData[0].isAnonymous,
          isLogging: insertData[0].isLogging,
          version: insertData[0].version,
          scopes: [insertData[0].scopes[0].scopes],
          relations: [
            {
              applicationId: insertData[0].applicationId,
              apiId: insertData[0].relations[0] ? insertData[0].relations[0].apiId : 0
            }
          ]
        }

      
        let insertProcess = await NarUtils.Request.Post({
          url: "apimanagement/v1/applications/" + insertData[0].applicationId + "/apis",
          blockElements: [table],
          data: irequest
        })
        console.log(irequest);


        if (insertProcess.isSuccess == false) {
          Nar.Modal.Alert("IslemBasarili", "KayitEklendi", "Ok");
        }
      }
      if (deleteData.length > 0) {

        let deleteProcess = await NarUtils.Request.Delete({
          url: "apimanagement/v1/applications/" + deleteData[0].applicationId + "/apis/" + deleteData[0].apiId
        })
        if (deleteProcess.isSuccess == false) {
          Nar.Modal.Alert("Response Error", deleteProcess.messagetype + " " + deleteProcess.message, "Ok");
          return false;
        }
      }
      return true;
    },
    SearchForm: (): DataTableSearchForm => {
      return {
        onClick: async (form) => {
          if (form.getValue().applicationId == undefined && form.getValue().apiId == undefined) {
            Nar.Modal.Alert("Response Error", "Listeleme için applicationId veya apiId giriniz.", "Ok");
          }
          if (form.getValue() != null && form.getValue().applicationId != undefined && form.getValue().apiId == undefined) {
            let response = await NarUtils.Request.Get<any[]>({
              url: "apimanagement/v1/applications/" + form.getValue().applicationId + "/apis"
            })
            if (response.isSuccess == true) {
              table.setValue(response.data);
            } else {
              Nar.Modal.Alert("Response Error", response.messagetype + " " + response.message, "Ok");
            }

          } else if (form.getValue() != null && form.getValue().applicationId && form.getValue().apiId != undefined) {
            let responseApi = await NarUtils.Request.Get<any[]>({
              url: "apimanagement/v1/applications/" + form.getValue().applicationId + "/apis/" + form.getValue().apiId
            })
            if (responseApi.isSuccess == true) {
              table.setValue(responseApi.data);
            } else {
              Nar.Modal.Alert("Response Error", responseApi.messagetype + " " + responseApi.message, "Ok");
            }
          }
        }
      }
    },
    EditForm: (): DataTableEditForm => {
      return {
        onEditMessage: (form) => {

          let data = form.getValue();
          if (data.maturityType == "Immediately") {
            data.rules = [];
          }

          return data;
        },
        onEditModalOpenDataFormat(data) {
          if (data.scopes != null && _.isArray(data.scopes)) {
            data.scopes = data.scopes.map(t => { return { scopes: t } });
          }
          return data;
        },
        formComponents: {

          objectName: "Form2", objectType: "Form", props: ({
            id: "Frm2", responsiveSize: { col: 2 }
          } as iFormProps),
          children: [
            { objectName: "name", objectType: "Input", props: ({ id: "name", label: "name" } as InputProps) },
            { objectName: "verb", objectType: "Select", props: { options: verbDataCombo, id: "verb", label: "verb", returntype: "value" } as SelectProps },
            { objectName: "urlTemplate", objectType: "Input", props: ({ id: "urlTemplate", label: "urlTemplate" } as InputProps) },
            { objectName: "isApproval", objectType: "Checkbox", props: ({ id: "isApproval", label: "isApproval" } as CheckboxProps) },
            { objectName: "isLogging", objectType: "Checkbox", props: ({ id: "isLogging", label: "isLogging" } as CheckboxProps) },
            { objectName: "version", objectType: "Input", props: ({ id: "version", label: "version" } as InputProps) },
            { objectName: "applicationId", objectType: "Select", props: { id: "applicationId", label: "applicationId", returntype: "value", ApiData: IApiManagement.GetApplicationId, hookContextKey: "applicationId" } as SelectProps },
            {
              objectName: "scopes", objectType: "DataTable", props: ({
                fullsize: true,
                id: "scopes", columns: [{ columnName: "scopes", dataKey: "scopes", columnControllerType: ControllerType.Input }], editmode: "excel", isformcontroller: true,
                returntype: "data"
              } as IDataTableProps)
            },
            {
              objectName: "releatedApis", objectType: "DataTable", props: ({
                fullsize: true,
                id: "relations",
                columns: [
                  { columnName: "applicationId", dataKey: "applicationId", columnControllerType: ControllerType.Select, columnControllerProps: { id: "", ApiData: IApiManagement.GetApplicationId, hookContextKey: "applicationId" } as SelectProps },
                  { columnName: "apiId", dataKey: "apiId", columnControllerType: ControllerType.Input }
                ], editmode: "excel", isformcontroller: true,

                returntype: "data"
              } as IDataTableProps)
            }
          ]
        }
      }
    },
    GetApplicationId: async (relatedValue: any, that: ISelectRef) => {

      const res = await NarUtils.Request.Get<any[]>({
        url: "apimanagement/v1/applications"
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

    }
  }
  return <>
    <useScreen.View screencode="ApiManagement" screenname="Api Management" saveType={SaveType.disable} onSaveClick={IApiManagement.onSaveClick}>
      <table.View
        id="PrizeTypeDefDataTable"
        maxHeight={800}
        SearchForm={IApiManagement.SearchForm()}
        EditForm={IApiManagement.EditForm()}
        expandableRowsComponent={(e) => {
          return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
        }}
        //header="Api Management Ekranı"        
        filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
        columns={
          [
            { dataKey: "apiId", columnName: "apiId", columnControllerType: ControllerType.Input, isNotRemoteFilter: false },
            { dataKey: "name", columnName: "name", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
            { dataKey: "urlTemplate", columnName: "urlTemplate", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
            { dataKey: "fullUrlTemplate", columnName: "fullUrlTemplate", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
            { dataKey: "version", columnName: "version", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
            { dataKey: "tokenQuantity", columnName: "tokenQuantity", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
            // { dataKey: "applicationCode", columnName: "applicationCode", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
            { dataKey: "verb", columnName: "verb", columnControllerType: ControllerType.Select, columnControllerProps: { id: "verb", options: verbDataCombo, returntype: "value" } as SelectProps, isNotRemoteFilter: true },
            {
              dataKey: "applicationId", columnName: "applicationId", dataViewKey: "applicationCode", columnControllerType: ControllerType.Select, columnControllerProps: {
                id: "applicationId", ApiData: IApiManagement.GetApplicationId, hookContextKey: "applicationId", returntype: "value"
              } as SelectProps
            },
            { dataKey: "isApproval", columnName: "isApproval", columnControllerType: ControllerType.Checkbox, isNotRemoteFilter: true },
            { dataKey: "isLogging", columnName: "isLogging", columnControllerType: ControllerType.Checkbox, isNotRemoteFilter: true },
            { dataKey: "isAnonymous", columnName: "isAnonymous", columnControllerType: ControllerType.Checkbox, isNotRemoteFilter: true },
            { dataKey: "scopes", columnName: "scopes", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
            { dataKey: "relations", columnName: "relations", columnControllerType: ControllerType.Input, isNotRemoteFilter: true }
          ]
        } />
    </useScreen.View>
  </>
}

export default ApiManagement