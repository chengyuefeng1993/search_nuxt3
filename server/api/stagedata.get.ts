import axios from 'axios';

export default  defineEventHandler(async (event) => {
  const query = getQuery(event)
  // const r = await axios.get('https://ml.corp.kuaishou.com/label/api/datasource/statistic/getSummarizeStatistic',{
  //   params:{
  //     dataSourceId:query.sourceid
  //   },
  //   headers:{
  //     Cookie:'_did=web_901942082B653B; clientid=3; did=web_3ebef482cca7f55256c8b42e04174ded; didv=1659179042288; _ga=GA1.2.1592057990.1660300870; hdige2wqwoino=W4w2WsybBniHQBzACiEAQrhF73PDREkK4a578b98; apdid=8a2f0f5e-1869-4268-a3d5-0689a7cd637aefc3511b153f72fc1693e09a1262a84a:1674130877:1; accessproxy_session=a1126ccd-b581-410d-bd7d-bf1eeeb7fa08; JSESSIONID=0791623C18CA9374300C943DE5BCCB68; MMUSESSION=bW11X2F1dGhfdXNlcl9oZWItY2hlbmd5dWVmZW5nODE; MMUSESSION=bW11X2F1dGhfdXNlcl9oZWItY2hlbmd5dWVmZW5nODE; XSRF-TOKEN=DD7F9DE5847419B010015B820F71F79939B8CC1B96C14F6169D95E6B946F18E7',
  //     Referer:`https://ml.corp.kuaishou.com/label-frontend/summary?dataSourceId=${query.sourceid}`,
  //     'X-XSRF-TOKEN':'DD7F9DE5847419B010015B820F71F79939B8CC1B96C14F6169D95E6B946F18E7'
  //   }
  // })
  const r = await axios({
    url:'http://114.116.41.110:4002/stagedata',
    params:{
      sourceid:query.sourceid
    }
  })
  console.log(r.data);
  return r.data
})
