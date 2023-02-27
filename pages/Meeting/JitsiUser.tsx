import { useEffect, useRef, useState } from "react";
import { Nar, FormRef } from "nar-ui-library";
import NarUtils from "nar-ui-utils";
import DataTablePage from "../testPage/datatable";
import { updateStatus } from "./JitsiAdmin";

export interface iJitsiUser {
  transactionId: string,
}
import dynamic from 'next/dynamic'
import { ApiError } from "next/dist/server/api-utils";

const JitsiMeeting = dynamic(
  () => import("@jitsi/react-sdk/lib/components/JitsiMeeting"),
  { ssr: false }
)
const MeetingStart = (props: { meeting: iJitsiUser, updateStateHandler }) => {

  return <JitsiMeeting
    domain={"jitsi-pilot.westus.cloudapp.azure.com"}
    roomName={props.meeting.transactionId}
    configOverwrite={{
      disableModeratorIndicator: true,
      startScreenSharing: true,
      enableEmailInStats: false,
      toolbarButtons: [
        'closedcaptions',
        'fullscreen',
        'hangup'
      ]
    }}
    interfaceConfigOverwrite={{
      DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo={{
      displayName: 'Müşteri',
      email: "selam1@selam1.com"
    }}

    onApiReady={(externalApi) => {
      let isUserJoin = false;
      externalApi.addListener('videoConferenceJoined', () => {
        isUserJoin = true;
      })
      externalApi.addListener('videoConferenceLeft', () => {

        if (!isUserJoin) {
          updateStatus(props.meeting.transactionId, "CANCELLED_BY_CUSTOMER")
        }
        externalApi.dispose();
        props.updateStateHandler(null);
        Nar.Modal.Alert("Görüntülü görüşmeye katıldığınız için teşekkür ederiz.", "İyi günler dileriz");
      })

      externalApi.addListener('participantLeft', () => {
        externalApi.executeCommand('hangup');
      })
    }}
    getIFrameRef={(iframeRef) => { iframeRef.style.height = '800px'; }}
  />
}
const JitsiUserPage = () => {
  let [state, setState] = useState<iJitsiUser>({ transactionId: null });
  const [render, setRender] = useState(false);

  const jUser = {
    createMeeting: async () => {
      state.transactionId = NarUtils.Utils.GUID();
      setState(state)

      NarUtils.Request.Post({
        url: "ch/ch-onboarding-service/meeting/v1/addmeetingtoqueue",
        isNarUIApi: true,
        data: {
          "context": {
            "channel": "MOBILEAPP",
            "language": "en"
          },
          "transactionId": state.transactionId
        }
      }).then(response => {
        if (response.isSuccess) {
          setRender(!render);
        }
      });
    }
  }

  const updateStateHandler = (transactionId) => {
    state.transactionId = transactionId;
    setState(state)
    setRender(!render);
  };

  
  return <>

    <div style={{ backgroundColor: "#0a0a0a" }}>
      {(state.transactionId == null &&<img src="https://www.albaraka.com.tr/_assets/img/albaraka-logo.svg" alt="React Logo"width="250" height="75"  />)}
      {(state.transactionId == null && <h3 style={{ color: "white", textAlign: "center", height: 100 }}>Görüntülü görüşme ekranına hoş geldiniz</h3>)}
    </div>

    <div>
      {(state.transactionId == null && <Nar.Button id="btn" color="link" block={true} icon={{ iconName: Nar.IconName.PhoneCall, size: 100, color: "success" }}
        onClick={jUser.createMeeting} />)}
      {(state.transactionId == null && <h1 style={{ color: "black", textAlign: "center" }}>KATIL</h1>)}
      {(state.transactionId == null && <h4 style={{ color: "green", textAlign: "center", height: 50 }}>Görüşmeyi başlatmak için butona tıklayınız</h4>)}
      {(state.transactionId != null && <MeetingStart meeting={state} updateStateHandler={updateStateHandler} />)}
    </div>
  </>;
};
export default JitsiUserPage;