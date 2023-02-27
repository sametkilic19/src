import { Nar, FormRef, ScreenRef, DataTableSearchForm, DataTableEditForm, ControllerType, SaveType } from "nar-ui-library"
import { NarUtils } from "nar-ui-utils";
import {plainToClass} from "class-transformer";

/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */
const SSMSDeviceDefinition = () => {
    /**
     * Screen 
     */
    let useScreen = Nar.Screen.useScreen();
    /**
     * Kullanilan Data Table
    */

    const Device = {

        Lock: async (row: any) => {
            Nar.Modal.Alert("Locked", "Locked");
        },

        Unlock: async (row: any) => {
            Nar.Modal.Alert("Unlocked", "Unlocked");
        }


    }
class Template{

    dataName: string;
    dataValue: string;
    GuardScore: {
        createdAt: Date;
        updatedAt: Date;
        createdUserId?: any;
        updatedUserId?: any;
        guardScoreId: string;
        deviceIntegrityVerdict?: any;
        appIntegrityVerdict: string;
        userIntegrityVerdict: string;
        hasExplicitSudoPrivileges: boolean;
        numberOfHarmfulAppsDetected?: number;
        isEmulator: boolean;
        onDebugMode: boolean;
        guardScore: number;
    }
    ApplicationMetadata: {
        dataName: string;
        dataValue: string;
    }
    Device: {
        createdAt: Date;
        updatedAt: Date;
        createdUserId?: any;
        updatedUserId?: any;
        deviceId: string;
        deviceMetadata: {
            dataName: string;
            dataValue: string;
        }[];
        guardScore: {
            createdAt: Date;
            updatedAt: Date;
            createdUserId?: any;
            updatedUserId?: any;
            guardScoreId: string;
            deviceIntegrityVerdict?: any;
            appIntegrityVerdict: string;
            userIntegrityVerdict: string;
            hasExplicitSudoPrivileges: boolean;
            numberOfHarmfulAppsDetected?: number;
            isEmulator: boolean;
            onDebugMode: boolean;
            guardScore: number;
        };
        applicationMetadata: {
            dataName: string;
            dataValue: string;
        }[];
    }
   
}
    class data1  { 
                deviceId:string;
                UserId: string;
                AppName: string;
                AppVersion: string;
                GuardVersion: string;
                Risks: string;
                OsType: string;
                OsVersion: string;
                Type: string;
                FirstLogin: string;
                LastLogin: string;
                Status: string;
            } 

    const fakeData = {
        deneme: [
            {
                deviceId: "1D2D30E9-41A9-ED11-8F87-005056ABAB5E",
                UserId: "123456",
                AppName: "VERSION_NAME",
                AppVersion: "b",
                GuardVersion: "b",
                Risks: "17",
                OsType: "OS_TYPE",
                OsVersion: "OS_VERSİON",
                Type: "abc",
                FirstLogin: "2023-02-21T06:52:46.700Z",
                LastLogin: "2023-02-21T06:52:46.000Z",
                Status: "A"
            },
            {
                deviceId: "1D2D30E9-41A9-ED11-8F87-005056ABAB5E",
                UserId: "123456",
                AppName: "VERSION_NAME",
                AppVersion: "b",
                GuardVersion: "b",
                Risks: "17",
                OsType: "OS_TYPE",
                OsVersion: "OS_VERSİON",
                Type: "abc",
                FirstLogin: "2023-02-21T06:52:46.700Z",
                LastLogin: "2023-02-21T06:52:46.000Z",
                Status: "A"
            }
        ]
    }
    let table = Nar.Controller.useDataTable();
    const ISSMSDeviceDefinition = {
        // onSaveClick: async (Screen: ScreenRef) => {
        //     let insertData = table.getValueAdvance().Value.Insert;
        //     if (insertData.length > 0) {

        //         let insertProcess = await NarUtils.Request.Get({
        //             url: "/guard/api/user-auth/user-device-binding/{customerId}",
        //             blockElements: [table],
        //             data: insertData
        //         })
        //         if (insertProcess.isSuccess == false) {
        //             Nar.Modal.Alert("Response Error", insertProcess.messagetype + " " + insertProcess.message, "Ok");
        //             return false;
        //         }
        //     }
        //     return true;
        // },
        SearchForm: (): DataTableSearchForm => {
            return {
                onClick: async (form) => {
                    if (form.getValue().deviceId != "" || form.getValue().deviceId != undefined) {
                        console.log("CustomerId:" + form.getValue().deviceId)
                        let response = await NarUtils.Request.Get<any[]>({
                            url: "ch/api/user-auth/user-device-binding/" + form.getValue().deviceId,
                            blockElements: [form]
                        })
                        if (response.isSuccess != true) {
                            const tempData = fakeData
                            const template = plainToClass(Template,tempData)
                            console.log("Denemee",template) 
                             
                            table.setValue(fakeData.deneme);

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
    // onSaveClick={ISSMSDeviceDefinition.onSaveClick}
    return <>
        <useScreen.View screencode="Devices" screenname="SSMS Device Listeleme" saveType={SaveType.disable} >
            <table.View
                id="PrizeTypeDefDataTable"
                maxHeight={800}
                SearchForm={ISSMSDeviceDefinition.SearchForm()}
                EditForm={ISSMSDeviceDefinition.EditForm()}
                expandableRowsComponent={(e) => {
                    return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
                }}

                header="Devices"
                filterType={"single"}
                //editmode={"modal"} //Add Record butonu
                //filterTypeLabelExcelModeIsShow={true}
                //isNotDelete={false}sS
                selectableRows={true}

                columns={
                    [
                        { dataKey: "deviceId", columnName: "deviceId", columnControllerType: ControllerType.Input, isNotRemoteFilter: false },
                        { dataKey: "UserId", columnName: "UserId", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "AppName", columnName: "AppName", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "AppVersion", columnName: "AppVersion", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "GuardVersion", columnName: "GuardVersion", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "Risks", columnName: "Risks", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "OsType", columnName: "OsType", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "OsVersion", columnName: "OsVersion", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "Type", columnName: "Type", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "FirstLogin", columnName: "FirstLogin", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "LastLogin", columnName: "LastLogin", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "Status", columnName: "Status", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                    ]
                }
                actions={[
                    { iconName: Nar.IconName.Lock, label: "Lock", onClick: (row) => { Device.Lock(row) } },
                    { iconName: Nar.IconName.Unlock, label: "Unlock", onClick: (row) => { Device.Unlock(row) } }

                ]}

            />
        </useScreen.View>
    </>
}

export default SSMSDeviceDefinition