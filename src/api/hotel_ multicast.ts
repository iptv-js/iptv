import { filter } from "../utils";
import type { TSources } from "../types";

export const ss_sources: TSources = [
  {
    name: "全国 酒店组播源",
    f_name: "ss_itv",
    url: "https://cdn.jsdelivr.net/gh/ssili126/tv@main/itvlist.m3u",
    filter: filter,
  },
];
