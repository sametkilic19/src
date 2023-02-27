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

export const cmbTypeData = [
    { value: 'Admin', label: "Admin" },
    { value: 'User', label: "User" }
]
/**
 * Wafra Ekrani Type Defination
 * @returns Page
 */

const UsersPage = () => {
    let useScreen = Nar.Screen.useScreen();
    let table = Nar.Controller.useDataTable();

    const IUsers = {
        onSaveClick: async (Screen: ScreenRef) => {
            let insertData = table.getValueAdvance().Value.Insert;
            let deleteData = table.getValueAdvance().Value.Delete;
            let updateData = table.getValueAdvance().Value.Update;
            if (insertData.length > 0) {

                if (!IUsers.InsertDatas()) {
                    return false;
                }
                else {
                    return true;
                }
            } else if (deleteData.length > 0) {

                if (!IUsers.DeleteDatas()) {
                    return false;
                } else {
                    return true;
                }
            }
            else if (updateData.length > 0) {
                if (!IUsers.UpdateDatas()) {
                    return false;
                } else {
                    return true;
                }
            }
            return true;
        },
        SearchForm: (): DataTableSearchForm => {
            return {
                onClick: async (form) => {
                    if (form.getValue().status == undefined || form.getValue().status == undefined) {
                        Nar.Modal.Alert("Response Error", "Satütü Bilgisini Giriniz.", "Ok");
                        return false;
                    }
                    if (form.getValue().userCode != "" && form.getValue().userCode != undefined) {
                        let responseUser = await NarUtils.Request.Get<any[]>({
                            url: "wafraapi/v1/management/kullanicilar/" + form.getValue().userCode
                        })

                        console.log(responseUser.data);
                        table.setValue([responseUser.data]);

                    } else {
                        let responseApi = await NarUtils.Request.Get<any[]>({
                            url: "wafraapi/v1/management/kullanicilar?Status=" + form.getValue().status
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
                    return data;
                },
                onEditModalOpenDataFormat(data, form, type) {
                    if (type == "Insert") {
                        form.getBaseController("userCode").setDisable(false);
                    } else {
                        data.userCode = data.userCode.label;
                        form.getBaseController("userCode").setDisable(true);

                    }
                    return data;
                },
                formComponents: {
                    objectName: "Form2", objectType: "Form", props: ({
                        id: "Frm2", responsiveSize: { col: 2 }
                    } as iFormProps),
                    children: [
                        { objectName: "name", objectType: "Input", props: ({ id: "name", label: "name", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }] } as InputProps) },
                        { objectName: "surname", objectType: "Input", props: ({ id: "surname", label: "surname", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz " } }] } as InputProps) },
                        {
                            objectName: "userCode", objectType: "Input", props: ({
                                id: "userCode", disabled: true, label: "userCode",
                                onChange: (e, value, that) => {
                                    console.log(value)
                                    if (value != null) {
                                        let valuedata = value.replace(/ /gi, "");
                                        if (valuedata != value) {
                                            that.setValue(valuedata);
                                        } else {
                                            that.setValue(value);
                                        }
                                    }

                                },
                                onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz" } }]
                            } as InputProps)
                        },
                        { objectName: "type", objectType: "Select", props: { options: cmbTypeData, id: "type", label: "type", returntype: "value" } as SelectProps },
                        { objectName: "status", objectType: "Select", props: { options: cmbStatusData, id: "status", label: "status", returntype: "value" } as SelectProps },
                        { objectName: "email", objectType: "Input", props: ({ id: "email", label: "email", onValid: [(that) => { return { IsValid: (that.getValue() != null && that.getValue().length > 0), ValidText: "Değer Giriniz " } }] } as InputProps) }

                    ]
                }
            }
        },
        GetUsers: async (relatedValue: any, that: ISelectRef) => {
            const res = await NarUtils.Request.Get<any[]>({
                url: "wafraapi/v1/management/kullanicilar?Status=Active"
            });

            let data: any = [];
            if (res.isSuccess == true) {
                data = (res.data ?? []).map(t => {
                    return { label: t.userCode + " " + t.name + " " + t.surname, value: t.userCode, data: t }
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
            insertData.forEach(element => {
                delete element.id;
                delete element.status;
            });

            let insertProcess = await NarUtils.Request.Post({
                url: "wafraapi/v1/management/users/bulk",
                blockElements: [table],
                data: { users: [...insertData] }
            })

            if (insertProcess.isSuccess == false) {
                Nar.Modal.Alert("Response Error", "KaydetmeSırasındaHataOlustu", "Ok");
                return false;
            }
            else {
                Nar.Modal.Alert("Response Error", "KaydetmeIslemiBasarili", "Ok");
                return true;
            }
        },
        UpdateDatas: async () => {
            let updateData = table.getValueAdvance().Value.Update;
            updateData.forEach(async element => {
                let irequestUpdate = {
                    name: element.name,
                    surname: element.surname,
                    type: element.type,
                    email: element.email,
                    status: element.status
                }

                let updateProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/users?id=" + element.id,
                    blockElements: [table],
                    data: irequestUpdate
                })
                console.log(updateProcess)
                if (updateProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
                    return false;
                }
                else {
                   console.log(updateProcess);
                    Nar.Modal.Alert("Response Error", "İşleminiz  referans numarası ile onaya düşmüştür", "Ok");
                }
            });

            return true;

        },
        DeleteDatas: async () => {
            let deleteData = table.getValueAdvance().Value.Delete;
            console.log(table.getValueAdvance().Value);
            deleteData.forEach(async element => {
                let irequestUpdate = {
                    name: element.name,
                    surname: element.surname,
                    type: element.type,
                    email: element.email,
                    status: "Passive"
                }

                let updateProcess = await NarUtils.Request.Put({
                    url: "wafraapi/v1/management/users/?id=" + deleteData[0].id,
                    blockElements: [table],
                    data: irequestUpdate
                })
                console.log(irequestUpdate)
                console.log(updateProcess)
                if (updateProcess.isSuccess == false) {
                    Nar.Modal.Alert("Response Error", updateProcess.messagetype + " " + updateProcess.message, "Ok");
                    return false;
                }
            });


            return true;
        }
    }

    Nar.StartEvent(() => {
        table.getSearchForm().setValue({ status: { value: 'Active', label: "Active" } })
    })
    return <>
        <useScreen.View screencode="Users" screenname="Kullanıcı Tanımlama Ekranı " saveType={SaveType.clear} onSaveClick={IUsers.onSaveClick} onLoad={() => {
            table.getSearchForm().setValue({ status: { value: 'Active', label: "Active" } })
        }}>
            <table.View
                id="UsersDataTable"
                maxHeight={800}
                SearchForm={IUsers.SearchForm()}
                EditForm={IUsers.EditForm()}
                filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
                columns={
                    [
                        { dataKey: "id", columnName: "id", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "name", columnName: "name", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "surname", columnName: "surname", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        {
                            dataKey: "userCode", columnName: "userCode", dataViewKey: "userCode", columnControllerType: ControllerType.Select, columnControllerProps: {
                                id: "userCode", ApiData: IUsers.GetUsers, hookContextKey: "userCode", returntype: "value"
                            } as SelectProps
                        },
                        { dataKey: "type", columnName: "type", columnControllerType: ControllerType.Select, isNotRemoteFilter: true, columnControllerProps: { id: "status", options: cmbTypeData, returntype: "value" } as SelectProps },
                        { dataKey: "email", columnName: "email", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
                        { dataKey: "status", columnName: "status", columnControllerType: ControllerType.Select, isNotRemoteFilter: false, columnControllerProps: { id: "status", options: cmbStatusData, returntype: "value" } as SelectProps }

                    ]
                } />
        </useScreen.View>
    </>
}

export default UsersPage