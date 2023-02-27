import { useRef } from "react";
import { IDateRef, Nar } from "nar-ui-library";
const PageDate = () => {
    let refTime = useRef<IDateRef>(null);
    let refDate = useRef<IDateRef>(null);
    let refData = useRef<IDateRef>(null);
    let DATA = {
        Checkbox: false,
        name: "Burke Flowers",
        phone: "(517) 236-3431",
        email: "penatibus.et.magnis@yahoo.edu",
        region: "Bursa",
        country: "China",
        numberrange: { value: 5 },
        currency: { value: 29633.39 },
        alphanumeric: "FYR28YBZ0EP",
        date: "2022-08-30T05:30:11.000Z",
        time: "22:18:43"
    }
    return <>
        <button onClick={() => {

            refDate.current?.setValue(new Date(DATA["date"]));
            refTime.current?.setValue(DATA["time"]);
            return;
            console.log(refData.current?.getValue());
            console.log(refData.current?.setValue({ StartDate: '10:00:00', StopDate: '12:00:00' }));


            console.log(refData.current?.setValue({ StartDate: '10:00:00', StopDate: '12:00:00' }));


        }}>ss</button>
        <Nar.Controller.Date id="datetimeREF" ref={refDate} type={"datetime"} enableSeconds label="datetime" />
        <Nar.Controller.Date id="time" ref={refTime} type={"time"} label="time" placeholder="time" enableSeconds />


        <Nar.Controller.Date id="time" ref={refData} type={"time"} label="time" mode={"range"} placeholder="time" enableSeconds />
        <Nar.Controller.Date id="daterenage" type={"date"} mode={"range"} label="daterenage" disabled onValid={(e) => { return { IsValid: false, ValidText: "selam1" }; }} />
        <Nar.Controller.Date id="date" type={"date"} label="date" />
        <Nar.Controller.Date id="datetime" type={"datetime"} enableSeconds label="datetime" />
        <Nar.Controller.Date id="datetimerange" type={"datetime"} mode={"range"} enableSeconds label="datetimerange" />
        <Nar.Controller.Input id="TEXTDATA" disabled label="TEXTDATA" onValid={(e) => { return { IsValid: false, ValidText: "selam1" }; }} />
    </>;
};

export default PageDate;
