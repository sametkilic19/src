import { DataTableAttachmentLib, Nar } from "nar-ui-library";
const PageUseScreenCodeValue = () => {
  let Screen = Nar.Screen.useScreen();
  

  return (
    <Screen.View screencode="SCRCODE" screenname="SAMPLE SCREEN" responsiveSize={{ col: 4 }}>
      <Nar.Button id="CodeValueBtn" label="Disable"
        onClick={() => {  
          console.log(Screen.getController("Form2").getBaseController("CodeValue").isDisable());
          Screen.getController("Form2").getBaseController("CodeValue").setDisable(!Screen.getController("Form2").getBaseController("CodeValue").isDisable())
        }} />

      <Nar.Button id="CodeValueBtn" label="Hide"
        onClick={() => {
          Screen.getController("Form2").getBaseController("CodeValue").setHide()
        }} />

      <Nar.Button id="CodeValueBtn" label="GetValue"
        onClick={() => {
          console.log(Screen.getValue())
          Nar.Modal.Alert("SCREEN DATA", <pre>{JSON.stringify(Screen.getValue(), null, "\t\t")}</pre>, "Ok")
        }} />

      <Nar.Button id="CodeValueBtn" label="SetValue"
        onClick={() => {
          Screen.getBaseController("Form2").getBaseController("CodeValue").setValue({ label: "CodeValue 1", value: "CodeValue 2", data: null })
        }} />
      <Nar.Form.FormView id="Form2" responsiveSize={{ col: 1 }} fullsize >
        <Nar.Controller.CodeValue
          id="CodeValue"
          label="selam1"
          hookContextKey="CacheKeyId"
          isClearButton={false}
          SearchApi={async (val) => { return { isSuccess: true, value: { data: val, value: val, label: "Label Text" } }; }}
          SearchButtonClick={(e) => {
            e.setValue({ label: "SearchButtonClick", value: "SearchButtonClick", data: null });
          }}
          DetailsButtonClick={(e) => {
            e.setValue({ label: "DetailsButtonClick", value: "DetailsButtonClick", data: null });
          }}
        />


      </Nar.Form.FormView>
    </Screen.View>);
};

export default PageUseScreenCodeValue;
