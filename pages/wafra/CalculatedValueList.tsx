import { Nar } from "nar-ui-library"
import { ControllerType } from "nar-ui-library"
import NarUtils from "nar-ui-utils";

const CalculatedValueListPage = () => {
    let useScreen = Nar.Screen.useScreen();
    let TableData2 = Nar.Controller.useDataTable();
    return <>
        {/* <hr />
            
        <hr />           
        Ekranda coin/token’ ın tüm hesaplanmış değerleri kronolojik olarak listelenebilecek ve grafik rapor alınabilecektir.
        <hr /> */}
        <useScreen.View screencode="CalVal" screenname=" Hesaplanmış Değer Listesi Ekranı  " >
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
                        { dataKey: "Months", columnName: "Months", columnControllerType: ControllerType.Input },
                        { dataKey: "Years", columnName: "Years", columnControllerType: ControllerType.Input },
                        { dataKey: "ParameterValue", columnName: "ParameterValue", columnControllerType: ControllerType.Input },
                        { dataKey: "Exchange", columnName: "Exchange", columnControllerType: ControllerType.Input }

                    ]
                } />
        </useScreen.View>
    </>
}

export default CalculatedValueListPage