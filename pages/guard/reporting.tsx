import { Nar, FormRef, ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType, SelectProps } from "nar-ui-library"
import { NarUtils } from "nar-ui-utils";

/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */

export const cmbMonthData = [
    { value: 'Ocak', label: "Ocak" },
    { value: 'Subat', label: "Subat" },
    { value: 'Mart', label: "Mart" },
    { value: 'Nisan', label: "Nisan" },
    { value: 'Mayıs', label: "Mayıs" },
    { value: 'Haziran', label: "Haziran" },
    { value: 'Temmuz', label: "Temmuz" },
    { value: 'Ağustos', label: "Ağustos" },
    { value: 'Eylül', label: "Eylül" },
    { value: 'Ekim', label: "Ekim" },
    { value: 'Kasım', label: "Kasım" },
    { value: 'Aralık', label: "Aralık" }

]
const SSMSReportingDefinition = () => {
    /**
     * Screen 
     */
    let useScreen = Nar.Screen.useScreen();
    /**
     * Kullanilan Data Table
     */


    const fakedata ={
        "data": [
            {
                "timestamp": "2023-02-07T08:49:49.000Z",
                "deviceId": "A7DFFF6B-C0A6-ED11-8F87-005056ABAB5E",
                "service": "verify-login-otp",
                "explanation": "integrity_check : true , register_flag : true Login with the registered version.\n            version: 2.0.0 , admin_user: undefined",
                "errorCode": null,
                "status": "INFO"
            },
            {
                "timestamp": "2023-02-07T08:49:49.000Z",
                "deviceId": "A7DFFF6B-C0A6-ED11-8F87-005056ABAB5E",
                "service": "verify-login-otp",
                "explanation": "Pin is confirmed.",
                "errorCode": null,
                "status": "INFO"
            },
            {
                "timestamp": "2023-02-07T08:49:49.000Z",
                "deviceId": "A7DFFF6B-C0A6-ED11-8F87-005056ABAB5E",
                "service": "check-activation",
                "explanation": "There is an active device binding record for customer id and device id.",
                "errorCode": null,
                "status": "INFO"
            },
            {
                "timestamp": "2023-02-07T08:49:48.000Z",
                "deviceId": "A7DFFF6B-C0A6-ED11-8F87-005056ABAB5E",
                "service": "pin",
                "explanation": "Pin created, user and device paired.",
                "errorCode": null,
                "status": "INFO"
            },
            {
                "timestamp": "2023-01-31T11:32:00.000Z",
                "deviceId": "060FF09F-59A1-ED11-8F87-005056ABAB5E",
                "service": "check-activation",
                "explanation": "There is an active device binding record for customer id and device id.",
                "errorCode": null,
                "status": "INFO"
            },
            {
                "timestamp": "2023-01-31T11:31:59.000Z",
                "deviceId": "060FF09F-59A1-ED11-8F87-005056ABAB5E",
                "service": "verify-login-otp",
                "explanation": "Integrity Check: false, No need to registration. \n        Process continues, version: 2.0.0, admin_user: EA9AF8FF-A55E-ED11-8116-005056AB8903",
                "errorCode": null,
                "status": "INFO"
            },
            {
                "timestamp": "2023-01-31T11:31:59.000Z",
                "deviceId": "060FF09F-59A1-ED11-8F87-005056ABAB5E",
                "service": "verify-login-otp",
                "explanation": "Pin is confirmed.",
                "errorCode": null,
                "status": "INFO"
            },
            {
                "timestamp": "2023-01-31T11:31:58.000Z",
                "deviceId": "060FF09F-59A1-ED11-8F87-005056ABAB5E",
                "service": "pin",
                "explanation": "Pin created, user and device paired.",
                "errorCode": null,
                "status": "INFO"
            },
            {
                "timestamp": "2023-01-31T11:20:17.000Z",
                "deviceId": "32F79DA3-45A1-ED11-8F87-005056ABAB5E",
                "service": "verify-login-otp",
                "explanation": "CustomerId is not admin and application is not registered. registeredFlag is false integrityChecked is true adminUser is EA9AF8FF-A55E-ED11-8116-005056AB8903",
                "errorCode": null,
                "status": "INFO"
            },
            {
                "timestamp": "2023-01-31T11:20:16.000Z",
                "deviceId": "32F79DA3-45A1-ED11-8F87-005056ABAB5E",
                "service": "pin",
                "explanation": "Pin created, user and device paired.",
                "errorCode": null,
                "status": "INFO"
            }
        ],
        "info": {
            "code": "00",
            "message": "Success"
        }
    }
        
    

    let table = Nar.Controller.useDataTable();
    const ISSMSReportingDefinition = {
        SearchForm: (): DataTableSearchForm => {
            return {
                onClick: async (form) => {
                    let insertData = table.getValueAdvance().Value.Insert;
                    
                        if (form.getValue().customer_id != "" || form.getValue().customer_id != undefined || form.getValue().date.StartDate.toJSON() != undefined) {
                            //console.log("Date  ",form.getValue().date.StartDate.toJSON())
                            let response = await NarUtils.Request.Post<any[]>({
                                url: "/guard/api/log/audit",
                                blockElements: [form],
                                data: insertData
                            })
                            if (response.isSuccess != true) {
                                const tempData = fakedata
                                table.setValue(fakedata.data);
                                
                            } else {
                                Nar.Modal.Alert("Response Error", response.messagetype + " " + response.message, "Ok");
                            }
                        }
                    
                }
            }
        },
        EditForm: (): DataTableEditForm => {
            return {
                onEditMessage: (form) => {
                    console.log(form.getValue());
                    let data = form.getValue();
                    return data;
                }
            }
        }
    }
    return <>
        <useScreen.View screencode="Reporting" screenname="SSMS Reporting" saveType={SaveType.disable} >
            <table.View
                id="PrizeTypeDefDataTable"
                maxHeight={800}
                SearchForm={ISSMSReportingDefinition.SearchForm()}
                EditForm={ISSMSReportingDefinition.EditForm()}
                expandableRowsComponent={(e) => {
                    return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
                }}

                header="Reporting"
                filterType={"single"}
                //editmode={"modal"} 
                filterTypeLabelExcelModeIsShow={true}
                columns={
                    [   { dataKey: "customerId", columnName: "CustomerId", columnControllerType: ControllerType.Input, isNotRemoteFilter: false,isHidden:true },
                        { dataKey: "deviceId", columnName: "UserId", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "date", columnName: "Date", columnControllerType: ControllerType.Date, isNotRemoteFilter: false,isHidden:true },
                        { dataKey: "service", columnName: "service", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "status", columnName: "Status", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "explanation", columnName: "Explanation", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "timestamp", columnName: "TimeStamp", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "errorCode", columnName: "ErrorCode", columnControllerType: ControllerType.Input, isNotRemoteFilter: true }
                    ]

                } />

        </useScreen.View>
    </>
}

export default SSMSReportingDefinition