import { Nar } from "nar-ui-library";
 
const Home = () => { 

  // Nar.Context.set("key1",{A:1,B:2})
  // let data=Nar.Context.get("key1");
  // console.log(data);
  let SampleScreen = [
    { test:"components", page:"testPage/components"},
    { test:"useForm", page:"testPage/useForm"},
    { test:"useScreen", page:"testPage/useScreen"},
    { test:"useScreenCodeValue", page:"testPage/useScreenCodeValue"},
    { test:"date", page:"testPage/date"},
    { test:"datatable", page:"testPage/datatable"},
    { test:"autorenderDataTable", page:"testPage/autorenderDataTable"},
    { test:"datatable Modal Edit Page", page:"testPage/datatableEditPage"},
    { test:"icons", page:"testPage/icons"},
    { test:"tab", page:"testPage/tab"},
    { test:"modal", page:"testPage/modal"},
    { test:"autorender", page:"testPage/autorender"},
    { test:"complexscreen", page:"testPage/complexscreen"}, 
    { test:"PAGE DESIGNER", page:"designer/page"}, 
    { test:"PAGE lang Sample", page:"testPage/lang"}, 
    { test:"SelectCascade Sample", page:"testPage/SelectCascade"}, 
    { test:"Html 5 Editor", page:"testPage/html5"}
  ];
  return <><Nar.View responsiveSize={{col:2}}>{SampleScreen.map((e, index) => { return <p key={index}><a target={"_blank"} href={`/NarUI/Screen/${e.page}`} rel="noreferrer">{e.test}</a></p>; }) }</Nar.View> </>;
};
export default Home;