import { ISource, TSources } from "../types";
import { collectM3uSource, converter, handle_m3u } from "../utils";

export const epg_pw_filter: ISource["filter"] = (
  raw,
  caller,
  collectFn
): [string, number] => {
  const rawArray = handle_m3u(raw);
  const regExp = /\#EXTINF:-1\s+tvg\-name\=\"([^"]+)\"/;

  let i = 1;
  let sourced: string[] = [];
  let result = [rawArray[0]];

  while (i < rawArray.length) {
    const reg = regExp.exec(rawArray[i]) as RegExpExecArray;

    if (!!reg) {
      if (caller === "normal" && collectFn) {
        collectM3uSource(rawArray[i], rawArray[i + 1], collectFn);
      }

      if (!sourced.includes(reg[1])) {
        sourced.push(reg[1]);
        result.push(
          rawArray[i]
            .replace(/\@\@[0-9]*/g, "")
            .replace(/\[geo\-blocked\]/, "")
            .replace(/\[Geo\-blocked\]/, "")
            .trim()
        );
        result.push(rawArray[i + 1]);
      }
    }

    i += 2;
  }

  return [converter(result.join("\n")), (result.length - 1) / 2];
};

export const epg_pw_sources: TSources = [
  {
    name: "epg.pw 央视",
    f_name: "ew_cc",
    url: "https://epg.pw/test_channels_china_national.m3u",
    filter: epg_pw_filter,
  },
  {
    name: "epg.pw 卫视",
    f_name: "ew_ws",
    url: "https://epg.pw/test_channels_china_province.m3u",
    filter: epg_pw_filter,
  },
  {
    name: "epg.pw 国内",
    f_name: "ew_cn",
    url: "https://epg.pw/test_channels_china.m3u",
    filter: epg_pw_filter,
  },
  {
    name: "epg.pw 香港",
    f_name: "ew_hk",
    url: "https://epg.pw/test_channels_hong_kong.m3u",
    filter: epg_pw_filter,
  },
  {
    name: "epg.pw 澳門",
    f_name: "ew_om",
    url: "https://epg.pw/test_channels_macau.m3u",
    filter: epg_pw_filter,
  },
  {
    name: "epg.pw 台灣",
    f_name: "ew_tw",
    url: "https://epg.pw/test_channels_taiwan.m3u",
    filter: epg_pw_filter,
  },
  {
    name: "epg.pw 全部",
    f_name: "ew_all",
    url: "https://epg.pw/test_channels_all.m3u",
    filter: epg_pw_filter,
  },
  {
    name: "epg.pw ipv6",
    f_name: "ew_all",
    url: "https://epg.pw/test_channels_ipv6.m3u",
    filter: epg_pw_filter,
  },
];
