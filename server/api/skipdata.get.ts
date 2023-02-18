import fs from "fs";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const token = fs.readFileSync("./server/api/skiptoken.txt");
  const cookie = fs.readFileSync("./server/api/cookie.txt");

  const r = await axios({
    url: "https://ml.corp.kuaishou.com/label/api/dispatcher/getClearSkipList",
    method: "post",
    data: {
      dataSourceId: query.sourceid,
      stageName: query.stagename,
    },
    headers: {
      Cookie: `${cookie.toString()}XSRF-TOKEN=${token.toString()}`,
      Referer: `https://ml.corp.kuaishou.com/label-frontend/skipClear?dataSourceId=${query.sourceid}`,
      "X-XSRF-TOKEN": token.toString(),
    },
  });

  let newToken = r.headers["set-cookie"]
    ?.pop()
    ?.match(/\w{64}/g)
    ?.pop();
  if (newToken) {
    fs.writeFile("./server/api/skiptoken.txt", newToken, "utf-8", (err) => {
      if (err) throw err;
    });
  }
  return r.data;
});
