// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
///http://localhost:3000/NarUI/Screen/api/hello
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  res.status(200).json({
    statusCode: 200,
    ok: true,
    data: {
      "scr1.form1.Input": "Input Text",
      "scr1.form1.InputNumber": "InputNumber Text",
      "scr1.form1.Date": "Date Text",
      "scr1.form1.Checkbox": "Checkbox Text",
      "scr1.form1.Radio": "Radio Text",
      "scr1.form1.Select": "Select Text",
      "scr1.SaveButton": "Kaydet",
      "scr1.DataTable1.LangDataTable": "scr1.DataTable1.LangDataTable",
      "scr1.DataTable1.CheckBox": "CheckBox 1",
      "scr1.DataTable1.name": "name 2",
      "scr1.DataTable1.phone": "phone 3"
    },
    message: null,
    messageCode: null
  } as any)
}
