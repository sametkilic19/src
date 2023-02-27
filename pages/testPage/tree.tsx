
import { Nar } from "nar-ui-library";
 
const data = [
    {
         title: "0-0-label", 
         key: "0-0-key",  
         children: [
            { 
                title: "0-0-0-label dadas", 
                key: "0-0-0-key-DATA",  
                children: [
                    { title: "0-0-0-0-label", key: "0-0-0-0-key" }, 
                    { title: "0-0-0-1-label", key: "0-0-0-1-key" }, 
                    { title: "0-0-0-2-label", key: "0-0-0-2-key" }
                ] 
            }, 
            { 
                title: "0-0-1-label", 
                key: "0-0-1-key",  
                children: [
                    { title: "0-0-1-0-label", key: "0-0-1-0-key" }, 
                    { title: "0-0-1-1-label", key: "0-0-1-1-key" }, 
                    { title: "0-0-1-2-label", key: "0-0-1-2-key" }
                ] 
            }, 
            { title: "0-0-2-label", key: "0-0-2-key" }
        ] 
    }, 
    { 
        title: "0-1-label", 
        key: "0-1-key",  
        children: [
            { 
                title: "0-1-0-label", 
                key: "0-1-0-key",  
                children: [
                    { title: "0-1-0-0-label", key: "0-1-0-0-key" }, 
                    { title: "0-1-0-1-label", key: "0-1-0-1-key" }, 
                    { title: "0-1-0-2-label", key: "0-1-0-2-key" }
                ] 
            }, 
            { 
                title: "0-1-1-label", 
                key: "0-1-1-key",  
                children: [
                    { title: "0-1-1-0-label", key: "0-1-1-0-key" }, 
                    { title: "0-1-1-1-label", key: "0-1-1-1-key" }, 
                    { title: "0-1-1-2-label", key: "0-1-1-2-key" }
                ] 
            }, 
            { title: "0-1-2-label", key: "0-1-2-key" }
        ] 
    }, 
    { title: "0-2-label", key: "0-2-key" }
];


const TreeRender = () => { 
    return <><br/><Nar.Controller.Tree data={data} oncheckdraganddrop={(e) => { return !e.dropToGap; }}  />  
 
  </>;
};

export default TreeRender;

