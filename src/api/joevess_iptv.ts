import { filter } from "../utils";
import type { TSources } from "../types";

export const joevess_iptv_sources: TSources = [
  {
    name: "joevess/IPTV home",
    f_name: "j_main_home",
    url: "https://raw.githubusercontent.com/joevess/IPTV/main/home.m3u8",
    filter: filter,
  },
  {
    name: "joevess/IPTV iptv",
    f_name: "j_main_iptv",
    url: "https://raw.githubusercontent.com/joevess/IPTV/main/iptv.m3u8",
    filter: filter,
  },
  {
    name: "joevess/IPTV sources",
    f_name: "j_sources_home",
    url: "https://raw.githubusercontent.com/joevess/IPTV/main/sources/home_sources.m3u",
    filter: filter,
  },
  {
    name: "joevess/IPTV iptv",
    f_name: "j_sources_iptv",
    url: "https://raw.githubusercontent.com/joevess/IPTV/main/sources/iptv_sources.m3u",
    filter: filter,
  },
  {
    name: "joevess/IPTV sources",
    f_name: "j_m3u_home",
    url: "https://raw.githubusercontent.com/joevess/IPTV/main/m3u/home.m3u",
    filter: filter,
  },
  {
    name: "joevess/IPTV iptv",
    f_name: "j_m3u_iptv",
    url: "https://raw.githubusercontent.com/joevess/IPTV/main/m3u/iptv.m3u",
    filter: filter,
  },
];
