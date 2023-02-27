import { SelectProps, Nar } from "nar-ui-library"
import { ControllerType } from "nar-ui-library"
import NarUtils from "nar-ui-utils";
export const comboDataParameter = [
    { value: 'Kıdem', label: "Kıdem" },
    { value: 'Terfi', label: "Terfi" },
    { value: 'FazlaMesai', label: "Fazla Mesai" },
    { value: 'PerformansPuani', label: "Performans Puanı" },
    { value: 'BlogYazisi', label: "Blog Yazısı" },
    { value: 'VerilenEgitim', label: "VerilenEgitim" }

]

const DistributionListPage = () => {
    let useScreen = Nar.Screen.useScreen();
    let TableData2 = Nar.Controller.useDataTable();
    return <>
        <useScreen.View screencode="DISLIST" screenname="Dağıtım Giriş Ekranından yüklemesi yapılan dataların listeleme ve izlemesinin yapılabileceği ekrandır.">
            <TableData2.View
                id="DataTable1"
                maxHeight={800}
                SearchForm={{
                    onClick: async (form) => {

                        console.log(form.getValue());
                        try {
                            let a = await NarUtils.Request.Get<any[]>({
                                url: "apimanagement.v1.apis",
                                blockElements: [form]
                            })
                            console.log(a);
                            if (a.data == null) {
                                console.log('Servisden Data Gelmedi.');
                            }
                            else {
                                TableData2.setValue(a.data);
                            }

                        }
                        catch (e) {
                            console.log(e);
                            alert("Serviste Hata Aldi: " + e);
                        }

                    }
                }}
                EditForm={{
                    onEditMessage: (form) => {
                        console.log(form.getValue());
                        return form.getValue();
                    }
                }}
                selectLoadExp={(row) => { return row.numberrange?.value > 5 }}
                header="DATA "
                expandableRowsComponent={(e) => {

                    return <div><pre>{JSON.stringify(e, null, "\t")}</pre></div>;
                }}
                selectableRows
                filterType={"multiple"} editmode={"modal"} filterTypeLabelExcelModeIsShow={true}
                columns={
                    [
                        { dataKey: "RegisterNumberNameSurname", columnName: "RegisterNumberNameSurname", columnControllerType: ControllerType.Input },
                        { dataKey: "ParameterCode", columnName: "ParameterCode", columnControllerType: ControllerType.Input },
                        { dataKey: "NumberOfCoin", columnName: "NumberOfCoin", columnControllerType: ControllerType.InputNumber, isNotEdit: true },
                        { dataKey: "DistributionDate", columnName: "DistributionDate", columnControllerType: ControllerType.Date },
                        { dataKey: "MaturityDate", columnName: "MaturityDate", columnControllerType: ControllerType.Date },
                        { dataKey: "Status", columnName: "Status", columnControllerType: ControllerType.Select, columnControllerProps: { id: "", options: comboDataParameter } as SelectProps }

                    ]
                } />
        </useScreen.View>
    </>

}

export default DistributionListPage