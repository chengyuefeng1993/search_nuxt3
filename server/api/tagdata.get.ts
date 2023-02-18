import fs from "fs";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const token = fs.readFileSync("./public/tagtoken.txt");
  const cookie = fs.readFileSync("./public/cookie.txt");

  const r = await axios({
    url: "https://ml.corp.kuaishou.com/label/api/datasource/statistic/queryStageStatistic",
    params: {
      dataSourceId: query.sourceid,
      stageName: query.stagename,
      start: query.tmstart,
      end: query.tmstop,
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
    fs.writeFile("./public/tagtoken.txt", newToken, "utf-8", (err) => {
      if (err) throw err;
    });
  }
  return r.data;
});
