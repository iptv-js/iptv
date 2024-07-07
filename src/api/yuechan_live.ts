import { filter } from "../utils";
import type { TSources } from "../types";

export const yuechan_live_sources: TSources = [
  {
    name: "YueChan-Live IPTV",
    f_name: "ycl_iptv",
    url: "https://raw.githubusercontent.com/YueChan/Live/main/IPTV.m3u",
    filter: filter,
  },
];
