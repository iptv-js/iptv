import { filter } from "../utils";
import type { TSources } from "../types";

export const qwerttvv_bj_iptv_sources: TSources = [
  {
    name: "北京联通 单播列表",
    f_name: "q_bj_iptv_unicom",
    url: "https://cdn.jsdelivr.net/gh/qwerttvv/Beijing-IPTV@master/IPTV-Unicom.m3u",
    filter: filter,
  },
  {
    name: "北京联通 组播列表",
    f_name: "q_bj_iptv_unicom_m",
    url: "https://cdn.jsdelivr.net/gh/qwerttvv/Beijing-IPTV@master/IPTV-Unicom-Multicast.m3u",
    filter: filter,
  },
  {
    name: "北京移动 单播列表",
    f_name: "q_bj_iptv_mobile",
    url: "https://cdn.jsdelivr.net/gh/qwerttvv/Beijing-IPTV@master/IPTV-Mobile.m3u",
    filter: filter,
  },
  {
    name: "北京移动 组播列表",
    f_name: "q_bj_iptv_mobile_m",
    url: "https://cdn.jsdelivr.net/gh/qwerttvv/Beijing-IPTV@master/IPTV-Mobile-Multicast.m3u",
    filter: filter,
  },
];
