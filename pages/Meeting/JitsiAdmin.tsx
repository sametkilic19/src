import { useEffect, useRef, useState, useTransition } from "react";
import { Nar, FormRef, ControllerType } from "nar-ui-library";
import NarUtils, { Gateway } from "nar-ui-utils";
//import JitsiMeeting from "@Jitsi/react-sdk/lib/components/JitsiMeeting"
import dynamic from 'next/dynamic'
import { iJitsiUser } from "./JitsiUser";
import { Modal } from "nar-ui-library/dist/modal/modal";
import { useUser } from "nar-ui-library/dist/context/userContext";
import { ApiError } from "next/dist/server/api-utils";

const JitsiMeeting = dynamic(
  () => import("@jitsi/react-sdk/lib/components/JitsiMeeting"),
  { ssr: false }
) 
export interface Meeting {
  id: number;
  transactionId: string;
  branchCode: number;
  agentId?: any;
  status: string;
  recordDate: string;
  lastUpdateDate: string;
}


export interface Queue {
  meetings: Meeting[];
}

let User;

export function updateStatus(transactionId, status) {
  NarUtils.Request.Post({
    url: "ch/ch-onboarding-service/meeting/v1/updatestatus",
    isNarUIApi: true,
    data: {
      "context": {
        "channel": "MOBILEAPP",
        "language": "en"
      },
      "transactionId": transactionId,
      "status": status
    }
  });
}

const MeetingStart = (props: { meeting: Meeting, Ayril }) => {

  return <JitsiMeeting
    domain={"jitsi-pilot.westus.cloudapp.azure.com"}
    roomName={props.meeting.transactionId}
    configOverwrite={{
      startWithAudioMuted: false,
      startWithVideoMuted: false,
      disableModeratorIndicator: true,
      startScreenSharing: true,
      stopScreenSharing: true,
      enableEmailInStats: false
    }}
    interfaceConfigOverwrite={{
      DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo={{
      displayName: User.user.userId,
      email: "selam1@selam1.com"
    }}
    onApiReady={(externalApi) => {
      externalApi.addListener('videoConferenceJoined', () => {
        externalApi.executeCommand('startRecording', {
          mode: 'file'
        })
      })
      externalApi.addListener('videoConferenceLeft', () => {
        externalApi.executeCommand('stopRecording', {
          mode: 'file'
        })
        updateStatus(props.meeting.transactionId, "ENDED");
        externalApi.dispose();
        props.Ayril();
      })
    }}
    getIFrameRef={(iframeRef) => { iframeRef.style.height = '800px'; }}
  />
}

const JitsiAdminPage = () => {

  let [state, setState] = useState<iJitsiUser>({ transactionId: null });
  const [render, setRender] = useState(false);
  const Table = Nar.Controller.useDataTable();

  const Modal = Nar.Modal.useModal();

  User = Nar.useUser();
  console.log("User:" + User?.user.userId);

  let token = Nar.MyApp.DATA.Gateway.Token;
  console.log("Token init:" + Nar.MyApp.DATA.Gateway.Token);

  const jAdmin = {

    List: async () => {
      NarUtils.Request.Post<Queue>({
        url: "ch/ch-onboarding-service/meeting/v1/getqueue",
        isNarUIApi: true,
        data: {
          "context": {
            "channel": "MOBILEAPP",
            "language": "en"
          }
        }
      }).then(response => {
        if (response.isSuccess) {
          Table.setValue(response.data.meetings);
          setRender(!render);
        }
      });
    },
    Katil: async (row: Meeting) => {
      Modal.setBody(<MeetingStart meeting={row} Ayril={Ayril} />);
      Modal.isOpen(true)
      NarUtils.Request.Post({
        url: "ch/ch-onboarding-service/meeting/v1/takemeetingfromqueue",
        isNarUIApi: true,
        data: {
          "context": {
            "channel": "MOBILEAPP",
            "language": "en"
          },
          "transactionId": row.transactionId
        }
      }).then(response => {
        if (response.isSuccess) {
          setRender(!render);
        }
      });

    }
  }

  const Ayril = (boolen) => {
    NarUtils.Request.Post<Queue>({
      url: "ch/ch-onboarding-service/meeting/v1/getqueue",
      isNarUIApi: true,
      data: {
        "context": {
          "channel": "MOBILEAPP",
          "language": "en"
        }
      }
    }).then(response => {
      if (response.isSuccess) {
        Table.setValue(response.data.meetings);
        setRender(!render);
      }
    });
    Modal.isOpen(boolen)
  }

  return <>
    <div>
      <Modal.View autoClear={true} body={() => (<div></div>)} fullscreen backdrop />
      <Table.View id="kuyruk"
        SearchForm={{ onClick: (form, that) => { jAdmin.List(); } }}
        columns={[
          { columnName: "transactionId", dataKey: "transactionId", columnControllerType: ControllerType.Input, isNotRemoteFilter: true  },
          { columnName: "branchCode", dataKey: "branchCode", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
          { columnName: "status", dataKey: "status", columnControllerType: ControllerType.Input, isNotRemoteFilter: true },
          { columnName: "recordDate", dataKey: "recordDate", columnControllerType: ControllerType.Input, isNotRemoteFilter: true }
        ]}
        actions={[{ iconName: Nar.IconName.PhoneCall, color: "success", label: "Katil", onClick: (row) => { jAdmin.Katil(row) } }]}
      />
    </div>
  </>;
};
export default JitsiAdminPage;

