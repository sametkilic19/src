import 'bootstrap/dist/css/bootstrap.min.css';
import "flatpickr/dist/themes/light.css";
import "nar-ui-library/styles/index.css";
import "../../styles/dragdrop.css";
 
import Head from 'next/head';
import { useRouter } from 'next/router';

import App from 'next/app';
import { Nar } from 'nar-ui-library';
import { Gateway } from 'nar-ui-utils';
/**
 * Web Api Project any other project include Start Page
 */ 
Nar.MyApp.DATA.App = App;
Nar.MyApp.DATA.Head = Head;
Nar.MyApp.DATA.useRouter = useRouter; 
Gateway.Url = process.env.GatewayUrl; 
Nar.MyApp.DATA.Gateway = Gateway; 
export default Nar.MyApp.App;