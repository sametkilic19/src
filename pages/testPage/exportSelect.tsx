import {  Nar } from "nar-ui-library"
import { ControllerType } from "nar-ui-library" 
import NarUtils from "nar-ui-utils";

const datatableEditPage = () => {

    let TableData2 = Nar.Controller.useDataTable();
    return <>
        <hr />
       Api Management Screen
        <hr />
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
                    { dataKey: "name", columnName: "name", columnControllerType: ControllerType.Input },
                    { dataKey: "verb", columnName: "Verb", columnControllerType: ControllerType.Input },
                    { dataKey: "version", columnName: "Version", columnControllerType: ControllerType.Input, isNotEdit: true },
                    { dataKey: "url", columnName: "URL", columnControllerType: ControllerType.Input },
                    { dataKey: "IsApproval", columnName: "IsApproval", columnControllerType: ControllerType.Input },
                    { dataKey: "IsLogging", columnName: "IsApproval", columnControllerType: ControllerType.Input },
                    { dataKey: "CorrelationId", columnName: "CorrelationId", columnControllerType: ControllerType.Input }
                ]
            } />
    </>
}

export default datatableEditPage