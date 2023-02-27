import { NarConfig } from "nar-ui-library" 
import PageAutorender from "../pages/testPage/autorender"
import PageAutorenderDataTable from "../pages/testPage/autorenderDataTable"
import PageComplexscreen from "../pages/testPage/complexscreen"
import PageComponents from "../pages/testPage/components"
import DataTablePage from "../pages/testPage/datatable"
import DatatableComponents from "../pages/testPage/datatableComponents"
import datatableEditPage from "../pages/testPage/datatableEditPage"
import PageDate from "../pages/testPage/date"
import Html5Page from "../pages/testPage/html5"
import IconScreen from "../pages/testPage/icons"
import PageLangs from "../pages/testPage/lang"
import PageModalTest from "../pages/testPage/modal"
import PageUseScreenSelectCascade from "../pages/testPage/SelectCascade"
import TabScreen from "../pages/testPage/tab"
import PageUseForm from "../pages/testPage/useForm"
import PageUseScreenCodeValue from "../pages/testPage/useScreenCodeValue"
import PageUseScreen from "../pages/testPage/useScreenCodeValue"
 
import AccountMonitoringPage from "../pages/wafra/AccountMonitoring"
import WafraApprovalPage from "../pages/wafra/Approval"
import BlacklistManagementPage from "../pages/wafra/BlacklistManagement"
import CalculatedValueListPage from "../pages/wafra/CalculatedValueList"
import DistributionListPage from "../pages/wafra/DistributionList"
import DistributionParameterDefinitionPage from "../pages/wafra/DistributionParameterDefinition"
import DistributionValueEntryPage from "../pages/wafra/DistributionValueEntry"
import FactorsPage from "../pages/wafra/Factors"
import ParameterValueEntryPage from "../pages/wafra/ParameterValueEntry"
import PrizesPage from "../pages/wafra/Prizes"
import PrizeTypesDefinitionPage from "../pages/wafra/PrizeTypesDefinition"
import TokenPage from "../pages/wafra/Token"
import TransferPage from "../pages/wafra/Transfer"
import UsersPage from "../pages/wafra/Users" 

export default {
    Start: NarConfig.Start,
    PageAutorender: PageAutorender,
    IconScreen: IconScreen,
    PageAutorenderDataTable: PageAutorenderDataTable,
    PageComplexscreen: PageComplexscreen,
    PageComponents: PageComponents,
    DataTablePage: DataTablePage,
    DatatableComponents: DatatableComponents,
    DatatableEditPage: datatableEditPage,
    PageDate: PageDate,
    Html5Page: Html5Page,
    PageLangs: PageLangs,
    PageModalTest: PageModalTest,
    PageUseScreenSelectCascade: PageUseScreenSelectCascade,
    TabScreen: TabScreen,
    PageUseForm: PageUseForm,
    PageUseScreen: PageUseScreen, 
    PageUseScreenCodeValue: PageUseScreenCodeValue,
    /** 
     * Wafra
    */
    AccountMonitoringPage: AccountMonitoringPage,
    UsersPage: UsersPage,
    TransferPage: TransferPage,
    TokenPage: TokenPage,
    PrizeTypesDefinitionPage: PrizeTypesDefinitionPage,
    PrizesPage: PrizesPage,
    ParameterValueEntryPage: ParameterValueEntryPage,
    FactorsPage: FactorsPage,
    DistributionValueEntryPage: DistributionValueEntryPage,
    DistributionParameterDefinitionPage: DistributionParameterDefinitionPage,
    DistributionListPage: DistributionListPage,
    CalculatedValueListPage: CalculatedValueListPage,
    BlacklistManagementPage: BlacklistManagementPage,
    WafraApprovalPage: WafraApprovalPage 

}