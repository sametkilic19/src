import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next'
import x from "./citys.json"


interface SearchType {
    value: string, label: string
}
const delay = ms => new Promise(res => setTimeout(res, ms));


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    let XData: any = x;
    console.log(req.body);
    console.log(req.query["query"].toString())
    const country = x.country;
    const city = x.city;
    const town = x.town;
    let returnData: any = null;
    if (req.query["wait"] != null && req.query["wait"] == "1") {
        await delay(5000)
    }
    if (req.query["error"] != null && req.query["error"] == "1") {
        await delay(5000)
        res.status(400).json({
            statusCode: 400,
            ok: false,
            data: returnData,
            message: "ErrorTest",
            messagetype: "ErrorCode"
        } as any)
    }

    if (req.query["query"] != null) {
        let body = req.body as  SearchType | SearchType[] 
        let search = null;
        switch (req.query["query"].toString()) {
            case "sampledata":
                returnData = XData.sampledata;
                break;
            case "country":
                returnData = country;
                break;
            case "city":
                search = _.isArray(body) ? body : [body];
                if (body != null && body != null && search.length > 0) {
                    console.log("ulke gore IL")
                    returnData = city.filter(t => search.filter(x => x.value == t.filter.toString()).length > 0)
                } else {
                    returnData = null;
                }
                break;
            case "town":
                search = _.isArray(body) ? body : [body];
                if (town != null && body != null && search.length > 0) {
                    console.log("Il gore Ilce")
                    returnData = town.filter(t => search.filter(x => x.value == t.filter.toString()).length > 0)
                } else {
                    returnData = null;
                }
                break;
        }
    }


    res.status(200).json({
        statusCode: 200,
        ok: true,
        data: returnData,
        message: null,
        messageCode: null
    } as any)
}


export default handler