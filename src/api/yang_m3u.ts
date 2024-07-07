import { filter } from "../utils";
import type { TSources } from "../types";

export const yang_m3u_sources: TSources = [
  {
    name: "YanG-1989 Gather",
    f_name: "y_g",
    url: "https://raw.githubusercontent.com/YanG-1989/m3u/main/Gather.m3u",
    filter: filter,
  },
  {
    name: "熊猫直播",
    f_name: "xiongmao",
    url: "https://raw.githubusercontent.com/huangsuming/iptv/main/list/ipanda.txt",
    filter: filter,
  },
  {
    name: "HBv4",
    f_name: "hbv4",
    url: "https://raw.githubusercontent.com/huangsuming/iptv/main/list/hbv4.txt",
    filter: filter,
  },
  {
    name: "HBv6",
    f_name: "hbv6",
    url: "https://raw.githubusercontent.com/huangsuming/iptv/main/list/hbv4.txt",
    filter: filter,
  },
];
