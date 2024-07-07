import { filter } from "../utils";
import type { TSources } from "../types";

export const cn_sources: TSources = [
  {
    name: "稳定 最新源",
    f_name: "hc_cntv",
    url: "https://cdn.jsdelivr.net/gh/hujingguang/ChinaIPTV@main/cnTV_AutoUpdate.m3u8",
    filter: filter,
  },
];
