import React from "react";
import { Nar } from "nar-ui-library";
const Html5Page = () => {
  let Form = Nar.Form.useForm();
  const IHtm5Form = {
    GetValue: () => {
      console.log(Form.getValue());
    },
    SetValue: () => {
      Form.setValue({ html5: "<br>TEST <p>TEST</p>" })
    },
    Disable: () => {
      Form.getBaseController("html5").setDisable();
    },
    Hidden: () => {
      Form.getBaseController("html5").setHide();
    }
  }

  return (<Form.View id="Form1" responsiveSize={{ col: 4 }}>
    <Nar.Button id="GetValue" label="GetValue" onClick={IHtm5Form.GetValue} />
    <Nar.Button id="SetValue" label="SetValue" onClick={IHtm5Form.SetValue} />
    <Nar.Button id="Disable" label="Disable" onClick={IHtm5Form.Disable} />
    <Nar.Button id="Hidden" label="Hidden" onClick={IHtm5Form.Hidden} />
    <Nar.Controller.HtmlInput fullsize id="html5" defaultValue="<br><p>asdasd</p>" />
  </Form.View>);
};

export default Html5Page;
