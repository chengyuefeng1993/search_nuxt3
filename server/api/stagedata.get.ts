import axios from "axios";
import fs from "fs";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const token = fs.readFileSync("./server/api/stagetoken.txt");
  const cookie = fs.readFileSync("./server/api/cookie.txt");
  // console.log(cookie.toString());

  const r = await axios({
    url: "https://ml.corp.kuaishou.com/label/api/datasource/statistic/getSummarizeStatistic",
    params: {
      dataSourceId: query.sourceid,
    },
    headers: {
      Cookie: `${cookie.toString()}XSRF-TOKEN=${token.toString()}`,
      Referer: `https://ml.corp.kuaishou.com/label-frontend/summary?dataSourceId=${query.sourceid}`,
      "X-XSRF-TOKEN": token.toString(),
    },
  });

  let newToken = r.headers["set-cookie"]
    ?.pop()
    ?.match(/\w{64}/g)
    ?.pop();
  if (newToken) {
    fs.writeFile("./server/api/stagetoken.txt", newToken, "utf-8", (err) => {
      if (err) throw err;
    });
  }
  return r.data;
});
