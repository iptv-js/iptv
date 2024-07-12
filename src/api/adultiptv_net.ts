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
  },
  {
    name: "vbskycn/iptv",
    f_name: "vbskycn_ipv4",
    url: "https://live.zhoujie218.top/tv/iptv4.m3u",
    filter: filter,
  },
  {
    name: "vbskycn/iptv",
    f_name: "vbskycn_ipv6",
    url: "https://live.zhoujie218.top/tv/iptv6.m3u",
    filter: filter,
  },
  {
    name: "hujingguang/ChinaIPTV",
    f_name: "hujingguang_cnTV_AutoUpdate",
    url: "https://raw.githubusercontent.com/hujingguang/ChinaIPTV/main/cnTV_AutoUpdate.m3u8",
    filter: filter,
  },
]
