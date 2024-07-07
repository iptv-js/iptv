import { filter } from "../utils";
import type { TSources } from "../types";

export const fanmingming_live_sources: TSources = [
  {
    name: "fanmingming/live demo",
    f_name: "fmml_demo",
    url: "https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/demo.m3u",
    filter: filter,
  },
  {
    name: "fanmingming/live ipv6",
    f_name: "fmml_ipv6",
    url: "https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/ipv6.m3u",
    filter: filter,
  },
  {
    name: "fanmingming/live ipv6plus",
    f_name: "fmml_ipv6plus",
    url: "https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/ipv6plus.m3u",
    filter: filter,
  },
  {
    name: "fanmingming/live domainv6(Invalid)",
    f_name: "fmml_bst",
    url: "https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/Invalid/bst.m3u",
    filter: filter,
  },
  {
    name: "fanmingming/live domainv6(Invalid)",
    f_name: "fmml_cbn",
    url: "https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/Invalid/cbn.m3u",
    filter: filter,
  },
  {
    name: "fanmingming/live domainv6(Invalid)",
    f_name: "fmml_dv6",
    url: "https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/Invalid/domainv6.m3u",
    filter: filter,
  },
  {
    name: "fanmingming/live domainv6(Invalid)",
    f_name: "fmml_ipv6",
    url: "https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/Invalid/ipv6.m3u",
    filter: filter,
  },
  {
    name: "fanmingming/live domainv6(Invalid)",
    f_name: "fmml_ysp",
    url: "https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/Invalid/ysp.m3u",
    filter: filter,
  },
];
