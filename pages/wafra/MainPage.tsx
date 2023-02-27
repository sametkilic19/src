
export default () => {
  const list: any[] = [
    { page: "../wafra/Factors", title: "Değerleme Parametre Tanım Ekranı" },   
    { page: "../wafra/ParameterValueEntry", title: "Değerleme Parametre Giriş Ekranı" },
    { page: "../wafra/Users", title: "Kullanıcı Tanımlama Ekranı" },
    { page: "../wafra/Token", title: "Token Üretme/Silme/İzleme ekranı" },
    { page: "../wafra/PrizeTypesDefinition", title: "Ödül Tipi Tanım Ekranı" },
    { page: "../wafra/Prizes", title: "Ödül Tipi Dağıtım Ekranı" },
    { page: "../wafra/Approval", title: "Onay Bekleyenler" },
    { page: "../wafra/Transfer", title: "Token Aktarım İşlemleri" },
    { page: "../wafra/DistributionList", title: "Dağıtım Listesi" },
    { page: "../wafra/DistributionValueEntry", title: "Dağıtım Giriş Ekranı" },
    { page: "../wafra/TransferRequestManagement", title: "Transfer Talep Yönetimi" },
    { page: "../wafra/BlacklistManagement", title: "Cüzdan Kara Liste Yönetim Ekranı" },
    { page: "../wafra/tabstest", title: "İzleme Ekranları : Hesap İzleme Ekranı" }

  ];

  const listApi: any[] = [{ page: "../apiManagement/apiManagement", title: "Api Kayıt Ekranı" }];

  const guardApi: any[] = [{ page: "../guard/devices", title: "Devices" }];
  const guardReport: any[] = [{ page: "../guard/reporting", title: "Reporting" }];

  return (
    <div style={{ textAlign: "center" }}>
      WAFRA Örnek Çalışmalar
      <hr />

      {list.map((t, index) => {
        return (
          <span key={index}>

            <a href={"" + t.page}>{t.title}</a>
            <br />
            <hr />
          </span>
        );
      })}

      APİ ÖRNEK ÇALIŞMALAR
      <hr />

      {listApi.map((t, index) => {
        return (
          <span key={index}>

            <a href={"" + t.page}>{t.title}</a>
            <br />
            <hr />
          </span>
        );
      })}

      GUARD
      <hr />

      {guardApi.map((t, index) => {
        return (
          <span key={index}>

            <a href={"" + t.page}>{t.title}</a>
            <br />
            <hr />
          </span>
        );
      })}
          {guardReport.map((t, index) => {
        return (
          <span key={index}>

            <a href={"" + t.page}>{t.title}</a>
            <br />
            <hr />
          </span>
        );
      })}

    </div>


  );
};
