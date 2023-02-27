import { ControllerType, ISelectRef, Nar, Options, SelectProps } from "nar-ui-library";
import NarUtils from "nar-ui-utils";
const options2 = [
  { value: 'chocolate2', label: 'Chocolate2', data: { a: "baba2" } },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'strawberry2', label: 'Strawberry2' },
  { value: 'vanilla2', label: 'Vanilla2' },
  { value: '1chocolate2', label: 'Chocolate2', data: { a: "baba2" } },
  { value: '2strawberry2', label: 'Strawberry2' },
  { value: '3vanilla2', label: 'Vanilla2' }
];
const PageUseScreenSelectCascade = () => {
  let UseForm = Nar.Form.useForm();
  let ErrorTest = Nar.Form.useForm();
  let Form2 = Nar.Form.useForm();
  let Screen = Nar.Screen.useScreen();

  const Table = Nar.Controller.useDataTable();

  Nar.StartEvent(async () => {
    console.log("START EVENT");
  })


  const IPageUseScreen = {
    ReLoadData: () => {
      Nar.HookContext.setHookCache<any>("SelectSample", options2);
    },
    SetValue: () => {
      Form2.getSelectController("Select3").setValue({ value: 'strawberry', label: 'Strawberry' })
    },
    SetValueDataTable: () => {

      console.log(Table.getValue());
      Table.RowUpdate(0, { "Country": { value: 'strawberry', label: 'Strawberry' } })
    },
    ErrorTestPCountryCode: async (relatedValue: any, that: ISelectRef) => {
      let data = await NarUtils.Request.Post<any>({ url: "Screen/api/selectbox?query=country", isNarUIApi: true, data: null });
      if (data.isSuccess == true) {
        return { options: data.data, isSuccess: true };
      } else {
        return { options: [], isSuccess: false, message: data.message, messagetype: data.messagetype };
      }
    },
    ErrorTestPTownCode: async (relatedValue: any, that: ISelectRef) => {
      let data = await NarUtils.Request.Post<any>({ url: "Screen/api/selectbox?query=city&error=1", isNarUIApi: true, data: relatedValue });
      if (data.isSuccess == true) {
        return { options: data.data, isSuccess: true };
      } else {
        return { options: [], isSuccess: false, message: data.message, messagetype: data.messagetype };
      }
    },
    ErrorTestPCityCode: async (relatedValue: any, that: ISelectRef) => {
      let data = await NarUtils.Request.Post<any>({ url: "Screen/api/selectbox?query=town", isNarUIApi: true, data: relatedValue });
      if (data.isSuccess == true) {
        return { options: data.data, isSuccess: true };
      } else {
        return { options: [], isSuccess: false, message: data.message, messagetype: data.messagetype };
      }
    },
    PCountryCode: async (relatedValue: any, that: ISelectRef) => {
      let data = await NarUtils.Request.Post<any>({ url: "Screen/api/selectbox?query=country", isNarUIApi: true, data: null });
      if (data.isSuccess == true) {
        return { options: data.data, isSuccess: true };
      } else {
        return { options: [], isSuccess: false, message: data.message, messagetype: data.messagetype };
      }
    },
    PCityCode: async (relatedValue: any, that: ISelectRef) => {
      let data = await NarUtils.Request.Post<any>({ url: "Screen/api/selectbox?query=city", isNarUIApi: true, data: relatedValue });
      if (data.isSuccess == true) {
        return { options: data.data, isSuccess: true };
      } else {
        return { options: [], isSuccess: false, message: data.message, messagetype: data.messagetype };
      }
    },
    PTownCode: async (relatedValue: any, that: ISelectRef) => {
      let data = await NarUtils.Request.Post<any>({ url: "Screen/api/selectbox?query=town", isNarUIApi: true, data: relatedValue });
      if (data.isSuccess == true) {
        return { options: data.data, isSuccess: true };
      } else {
        return { options: [], isSuccess: false, message: data.message, messagetype: data.messagetype };
      }
    },
    RelatedData: async (relatedValue: any, that: ISelectRef) => {
      let data = await NarUtils.Request.Post<any>({ url: "Screen/api/selectbox?query=sampledata&wait=1", isNarUIApi: true, data: null });
      if (data.isSuccess == true) {
        return { options: data.data, isSuccess: true };
      } else {
        return { options: [], isSuccess: false, message: data.message, messagetype: data.messagetype };
      }
    },
    AutoCompleteMode: async (SearchText: string, relatedValue: any, that: ISelectRef): Promise<{
      options: Options[],
      message?: string,
      messagetype?: string,
      isSuccess: boolean
    }> => {
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(2000)
      console.log("search", SearchText)
      return {
        isSuccess: true,
        options: [{ label: SearchText + " AutoCompleteMode relatedValue(" + ((relatedValue?.value) ?? "") + ")", value: SearchText }]
      }
    }

  };
  return (
    <Screen.View screencode="scr1" screenname="SAMPLE SCREEN" responsiveSize={{ col: 2 }}>

      <ErrorTest.View id="ErrorTest" responsiveSize={{ col: 1 }}>
        <Nar.Controller.Select id="ErrorTestPCountryCode" isClearable isSearchable label="ErrorTestPCountryCode" defaultValue={[{ value: 90, label: 'TÜRKİYE' }]} hookContextKey="ErrorTestPCountryCode"
          ApiData={IPageUseScreen.ErrorTestPCountryCode} />
        <Nar.Controller.Select id="ErrorTestPCityCode" isClearable isSearchable label="ErrorTestPCityCode" isMulti defaultValue={{ value: 1, label: 'ADANA' }} hookContextKey="ErrorTestPCityCode" RelatedId="ErrorTestPCountryCode"
          ApiData={IPageUseScreen.ErrorTestPTownCode} />
        <Nar.Controller.Select id="ErrorTestPTownCode" isClearable isSearchable label="ErrorTestPTownCode" isMulti defaultValue={{ value: 0, label: "MERKEZ" }} hookContextKey="ErrorTestPTownCode" RelatedId="ErrorTestPCityCode"
          ApiData={IPageUseScreen.ErrorTestPCityCode} />
      </ErrorTest.View>
      <UseForm.View id="form1" responsiveSize={{ col: 1 }}>
        <Nar.Controller.Select id="PCountryCode" isClearable isSearchable label="PCountryCode" defaultValue={[{ value: 90, label: 'TÜRKİYE' }]} hookContextKey="PCountryCode" ApiData={IPageUseScreen.PCountryCode} />
        <Nar.Controller.Select id="PCityCode" isClearable isSearchable label="PCityCode" isMulti defaultValue={{ value: 1, label: 'ADANA' }} hookContextKey="PCityCode" RelatedId="PCountryCode" ApiData={IPageUseScreen.PCityCode} />
        <Nar.Controller.Select id="PTownCode" isClearable isSearchable label="PTownCode" isMulti defaultValue={{ value: 0, label: "MERKEZ" }} hookContextKey="PTownCode" RelatedId="PCityCode" ApiData={IPageUseScreen.PTownCode} />
      </UseForm.View>
      <Form2.View id="form2" responsiveSize={{ col: 2 }}>
        <Nar.Controller.Radio id="Select1" isClearable isSearchable label="Select1" hookContextKey="citydata" ApiData={IPageUseScreen.RelatedData} />
        <Nar.Controller.Select id="Select2" isMulti isClearable isSearchable label="Select2" RelatedId="Select1" hookContextKey="SelectSampleData" RelatedType="RelatedData" />
        <Nar.Controller.Select id="Select3" fullsize isClearable isSearchable label="Select3" RelatedId="Select2" hookContextKey="SelectSampleData" RelatedType="RelatedData" />
        <Nar.Controller.Select id="Select4" fullsize isClearable isSearchable label="Select4" RelatedId="Select3" isMulti 
        AutoCompleteMode={{ autoCompleteHookKey: "Select4", Api: IPageUseScreen.AutoCompleteMode }} />
        <Nar.Button id="Btn2" onClick={IPageUseScreen.ReLoadData} label="ReLoadData options" />
        <Nar.Button id="Btn2" onClick={IPageUseScreen.SetValue} label="SetValue" />
      </Form2.View>
      <Nar.Button id="setValue" onClick={IPageUseScreen.SetValueDataTable} label="SetValue" />
      <Table.View
        fullsize
        editmode="excel"
        filterType="multiple"
        filterTypeLabelExcelModeIsShow
        columns={
          [
            {
              columnName: "ULKE", dataKey: "Country", columnControllerType: ControllerType.Select,
              columnControllerProps: {
                id: "Country", isClearable: true, hookContextKey: "SelectBoxTableCountry", isSearchable: true,
                ApiData: IPageUseScreen.PCountryCode
              } as SelectProps
            },
            {
              columnName: "IL", dataKey: "City", columnControllerType: ControllerType.Select,
              columnControllerProps: {
                id: "City", isClearable: true, hookContextKey: "SelectBoxTableCity", isSearchable: true,
                ApiData: IPageUseScreen.PCityCode, RelatedId: "Country"
              } as SelectProps
            },
            {
              columnName: "ILCE", dataKey: "Town", columnControllerType: ControllerType.Select,
              columnControllerProps: {
                id: "Town", isClearable: true, hookContextKey: "SelectBoxTableTown", isSearchable: true,
                ApiData: IPageUseScreen.PTownCode, RelatedId: "City"
              } as SelectProps
            }
          ]}
        id="SelectBoxTable"
        data={[
          { "Country": { value: 90, label: 'TÜRKİYE' }, City: { value: 1, label: 'ADANA' }, Town: { value: 0, label: "MERKEZ" } },
          { "Country": { value: 90, label: 'TÜRKİYE' }, City: { value: 2, "label": "ADIYAMAN" }, Town: { value: 5, "label": "KAHTA" } }
        ]} />
    </Screen.View>);
};

export default PageUseScreenSelectCascade;
