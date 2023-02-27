import { Nar, FormRef, ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType, SelectProps } from "nar-ui-library"
import { NarUtils } from "nar-ui-utils";
import { plainToClass } from "class-transformer";

/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */
export const cmbPackageNameData = [
    { value: 'AlbaFX', label: "AlbaFX" },
    { value: 'AlbarakaApp', label: "AlbarakaApp" }
]

class data {

    PackageName: string;
    AdvanceSettings: string;
    Value: number;  
    Definition: string;



    constructor( PackageName: string, AdvanceSettings: string,  Value: number, Definition: string) 
        {
        this.PackageName = PackageName;
        this.AdvanceSettings = AdvanceSettings;
        this.Value = Value;
        this.Definition = Definition;
    }
}
class Template {

    data: {
            createdAt: string;
            updatedAt: Date;
            createdUserId?: any;
            updatedUserId?: any;
            appId: string;
            name: string;
            version: string;
            explanation: string;
            bundleId: string;
            storeId: string;
            parameterList: {
                createdAt: Date;
                updatedAt: Date;
                createdUserId?: any;
                updatedUserId?: any;
                parameterId: string;
                name: string;
                value: number;
                explanation: string;
            }[];
        }
    
    info: {
        code: string;
        message: string;

    }    
}

const fakeData = {
    "data": {
        "createdAt": "2022-11-22T08:02:23.650Z",
        "updatedAt": "2022-11-22T08:02:23.650Z",
        "createdUserId": "ABT-GUARD",
        "updatedUserId": "ABT-GUARD",
        "appId": "0C1EAAFE-3B6A-ED11-8F87-005056ABAB5E",
        "name": "Albaraka Mobil",
        "version": "1.4.0",
        "explanation": "Albaraka Mobil UAT 1.4.0",
        "bundleId": "com.albarakaturk.mobilebranchtest1",
        "storeId": "APP_STORE",
        "parameterList": [
            {
                "createdAt": "2022-11-22T08:05:44.297Z",
                "updatedAt": "2022-11-22T08:05:44.297Z",
                "createdUserId": "ABT-GUARD",
                "updatedUserId": "ABT-GUARD",
                "parameterId": "94104673-3C6A-ED11-8F87-005056ABAB5E",
                "name": "GUARD_SCORE_THRESHOLD",
                "value": "30",
                "explanation": ""
            },
            {
                "createdAt": "2022-11-22T08:07:31.463Z",
                "updatedAt": "2022-11-22T08:07:31.463Z",
                "createdUserId": "ABT-GUARD",
                "updatedUserId": "ABT-GUARD",
                "parameterId": "647B22B6-3C6A-ED11-8F87-005056ABAB5E",
                "name": "KEY_EXPIRE_TIME",
                "value": "365",
                "explanation": ""
            },
            {
                "createdAt": "2022-11-22T08:07:31.620Z",
                "updatedAt": "2022-11-22T08:07:31.620Z",
                "createdUserId": "ABT-GUARD",
                "updatedUserId": "ABT-GUARD",
                "parameterId": "657B22B6-3C6A-ED11-8F87-005056ABAB5E",
                "name": "KEY_TYPE",
                "value": "Read",
                "explanation": ""
            },
            {
                "createdAt": "2022-11-22T08:07:31.760Z",
                "updatedAt": "2022-11-22T08:07:31.760Z",
                "createdUserId": "ABT-GUARD",
                "updatedUserId": "ABT-GUARD",
                "parameterId": "667B22B6-3C6A-ED11-8F87-005056ABAB5E",
                "name": "KEY_SIZE",
                "value": "2048",
                "explanation": ""
            },
            {
                "createdAt": "2022-11-22T08:07:31.760Z",
                "updatedAt": "2022-11-22T08:07:31.760Z",
                "createdUserId": "ABT-GUARD",
                "updatedUserId": "ABT-GUARD",
                "parameterId": "677B22B6-3C6A-ED11-8F87-005056ABAB5E",
                "name": "KEY_TYPE",
                "value": "Login",
                "explanation": ""
            },
            {
                "createdAt": "2022-11-22T08:07:31.760Z",
                "updatedAt": "2022-11-22T08:07:31.760Z",
                "createdUserId": "ABT-GUARD",
                "updatedUserId": "ABT-GUARD",
                "parameterId": "687B22B6-3C6A-ED11-8F87-005056ABAB5E",
                "name": "KEY_TYPE",
                "value": "Encrypt",
                "explanation": ""
            },
            {
                "createdAt": "2022-11-22T08:07:31.760Z",
                "updatedAt": "2022-11-22T08:07:31.760Z",
                "createdUserId": "ABT-GUARD",
                "updatedUserId": "ABT-GUARD",
                "parameterId": "697B22B6-3C6A-ED11-8F87-005056ABAB5E",
                "name": "PIN_ERROR_COUNT",
                "value": "5",
                "explanation": ""
            },
            {
                "createdAt": "2022-11-22T08:07:31.777Z",
                "updatedAt": "2022-11-22T08:07:31.777Z",
                "createdUserId": "ABT-GUARD",
                "updatedUserId": "ABT-GUARD",
                "parameterId": "6A7B22B6-3C6A-ED11-8F87-005056ABAB5E",
                "name": "ALGORITHM",
                "value": "RSA",
                "explanation": ""
            }
        ],
        "guardScoreParameterList": []
    },
    "info": {
        "code": "00",
        "message": "Success"
    }
}

const SSMSAdvangeSettingsDefinition = () => {
    /**
     * Screen 
     */
    let useScreen = Nar.Screen.useScreen();
    /**
     * Kullanilan Data Table
     */

    let table = Nar.Controller.useDataTable();
    const ISSMSAdvangeSettingsDefinition = {
        onSaveClick: async (Screen: ScreenRef) => {
            let updateData = table.getValueAdvance().Value.Update;
            let insertData = table.getValueAdvance().Value.Insert;
            if (updateData.length > 0) {
                let updateProcess =
                    await NarUtils.Request.Put({
                        url: "wafraapi/v1/management/prize-types",
                        blockElements: [table],
                        data: updateData
                    })

                if (updateProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
                    return false;
                }
            }
            if (insertData.length > 0) {

                let insertProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/prize/bulk",
                    blockElements: [table],
                    data: insertData
                })
                if (insertProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", insertProcess.messagetype + " " + insertProcess.message, "Ok");
                    return false;
                }
            }
            return true;
        },
        SearchForm: (): DataTableSearchForm => {
            return {
                onClick: async (form) => {
                    let response = await NarUtils.Request.Get<any[]>({
                        url: "guard/api/application/parameter/"+form.getValue().packageName+"/"+form.getValue().version,
                        blockElements: [form],
                        data: form.getValue()
                    })
                    if (response.isSuccess != true) {
                        const tempData = fakeData
                        const template = plainToClass(Template, tempData)
                       console.log("Deneme",template.data.parameterList[0].name)
                       var dataa: data[] =[];
                       for(var i in  template.data.parameterList){
                        console.log("sayi ",i)
                        dataa.push(new data(
                            form.getValue().packageName,
                            template.data.parameterList[i].name,
                            template.data.parameterList[i].value,
                            template.data.parameterList[i].explanation
                        ))
                       }
                       
                        table.setValue(dataa);

                    } else {
                        Nar.Modal.Alert("Response Error", response.messagetype + " " + response.message, "Ok");
                    }
                }
            }
        },
        EditForm: (): DataTableEditForm => {
            return {
                onEditMessage: (form) => {
                    let data = form.getValue();
                    return data;
                }
            }
        }
    }

    return <>
        <useScreen.View screencode="AdvanceSettings" screenname="SSMS AdvanceSettings " saveType={SaveType.disable} onSaveClick={ISSMSAdvangeSettingsDefinition.onSaveClick}>
            <table.View
                id="PrizeTypeDefDataTable"
                maxHeight={800}
                SearchForm={ISSMSAdvangeSettingsDefinition.SearchForm()}
                EditForm={ISSMSAdvangeSettingsDefinition.EditForm()}
                expandableRowsComponent={(e) => {
                    return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
                }}


                header="AdvanceSettings"
                filterType={"single"}
                editmode={"modal"} //Add Record butonu
                //filterTypeLabelExcelModeIsShow={true}
                //isNotDelete={false}
                selectableRows={true}

                columns={
                    [
                        { dataKey: "PackageName", columnName: "PackageName", columnControllerType: ControllerType.Select, isNotRemoteFilter: false, isHidden: true, columnControllerProps: { id: "ClentType", options: cmbPackageNameData, returntype: "value" } as SelectProps },
                        { dataKey: "AdvanceSettings", columnName: "AdvanceSettings", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "version", columnName: "Version", columnControllerType: ControllerType.Input, isNotRemoteFilter: false , isHidden:true},
                        { dataKey: "Value", columnName: "Value", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "Definition", columnName: "Definition", columnControllerType: ControllerType.Input, isNotRemoteFilter: true }
                    ]
                } />
        </useScreen.View>
    </>
}

export default SSMSAdvangeSettingsDefinition 