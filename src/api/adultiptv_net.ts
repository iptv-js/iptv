import { filter } from "../utils";
import type { TSources } from "../types";
//https://zhuan.dnwx.vip/?url=https://mpimg.cn%2Fdown.php/F67ed75e5d3486a5dd1122bc6a197cb49.txt 挂了
export const adultiptv_sources: TSources = [
  {
    name: "adultiptv.net",
    f_name: "adultiptv_chs",
    url: "http://adultiptv.net/chs.m3u",
    filter: filter,
  },
  {
    name: "adultiptv.net",
    f_name: "adultiptv_all",
    url: "http://adultiptv.net/all.m3u",
    filter: filter,
  }
]
