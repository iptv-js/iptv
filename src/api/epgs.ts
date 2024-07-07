import { DSource } from "../types";

export const epgs_sources: DSource[] = [
  {
    name: "EPG接口1",
    f_name: "fmml",
    url: "https://raw.githubusercontent.com/fanmingming/live/main/e.xml",
  },
  {
    name: "EPG接口2",
    f_name: "51zmt",
    url: "http://epg.51zmt.top:8000/e.xml",
  },
  {
    name: "EPG接口3",
    f_name: "51zmt_cc",
    url: "http://epg.51zmt.top:8000/cc.xml",
  },
  {
    name: "EPG接口4",
    f_name: "51zmt_df",
    url: "http://epg.51zmt.top:8000/difang.xml",
  },
];
