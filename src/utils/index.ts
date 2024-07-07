import "dotenv/config";

import type { TREADMEMirrorSitesMatrix, ISource } from "../types";

import * as OpenCC from "opencc-js";

import { existsSync } from 'node:fs'

import path from "node:path";

export const config_path = path.resolve("config");

export const config_custom_path = path.join(config_path, "custom");

export const dist_path = path.resolve("dist");

export const TMPL_DIR = process.env.TMPL_DIR || "src/tmpl";

export const txt_path = path.join(dist_path, "txt");

export const epg_path = path.join(dist_path, "epg");

export const list_path = path.join(dist_path, "list");

export const sources_path = path.join(dist_path, "sources");

export const tvbox_path = path.join(dist_path, "tvbox");

export const write_custom_path = path.join(dist_path, "custom");

export const README_DIR = path.join(".readme");

export const PUBLIC_DIR = process.env.PUBLIC_DIR || "./.gh-pages";

export const OWNER = "vodtv";

export const REPO = "iptv-source";

/**
 * 检查文件是否可用
 * @param f
 * @returns
 */
export const canIUseM3uFile = (f: string) => {
  const m3u_p = path.resolve("dist", f)
  return existsSync(m3u_p)
}

/**
 * 检查 iptv-checker 环境
 * @returns
 */
export const canIUseIPTVChecker = async () => {
  const { ENABLE_IPTV_CHECKER, IPTV_CHECKER_URL } = process.env

  if (ENABLE_IPTV_CHECKER !== "true" || !IPTV_CHECKER_URL) return false

  try {
    const res = await fetch(IPTV_CHECKER_URL)
    if (/^[2]/.test(res.status.toString())) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

export const update_time =
  new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

export const converter = OpenCC.Converter({ from: "hk", to: "cn" });

export const get_custom_url = () =>
  !!process.env.CUSTOM_URL ? process.env.CUSTOM_URL : "https://iptv.vodtv.cn";

export const sites_matrix: TREADMEMirrorSitesMatrix = [
  {
    protocol: "https",
    url: "https://raw.viptv.work",
    frequence: "viptv.work",
    idc: "官方云",
    provider: "[viptv](https://github.com/viptv-work)",
  }
]

export const get_rollback_urls = () => {
  const matrix_url = sites_matrix.map((m) => m.url)
  if (!process.env.ROLLBACK_URLS) {
    return ["https://iptv.vodtv.cn", ...matrix_url];
  }
  return process.env.ROLLBACK_URLS.split(",")
    .map((url) => url.trim())
    .concat(["https://iptv.vodtv.cn", ...matrix_url]);
};

export const get_github_raw_proxy_url = () => {
  const custom = process.env.CUSTOM_GITHUB_RAW_SOURCE_PROXY_URL;
  return !!custom ? custom : `https://gh.con.sh/`;
};

export const replace_github_raw_proxy_url = (s: string) => {
  const proxy_url = get_github_raw_proxy_url();
  return s.replace(
    /tvg\-logo="https:\/\/raw\.githubusercontent\.com\//g,
    `tvg-logo="${proxy_url}/https://raw.githubusercontent.com/`
  );
};

export const is_filted_channels = (s: string) => {
  if (s.includes("ABN")) {
    return true;
  }
  if (s.includes("NTD")) {
    return true;
  }
  return false;
};

export const handle_m3u = (r: string) => {
  const raw = r
    .trim()
    .replace(/\r/g, "")
    .split("\n")
    .filter((r) => !!r);
  let result: string[] = [];
  const extM3uRegExp = /#EXTM3U/;
  const extinfRegExp = /#EXTINF:-1([^,]*),(.*)/;
  const hostRegExp = /^([^:]+):\/\/([^/]+)/;
  for (let i = 0; i < raw.length; i++) {
    if (extM3uRegExp.test(raw[i])) {
      result.push(raw[i]);
      continue;
    }
    if (extinfRegExp.test(raw[i]) && hostRegExp.test(raw[i + 1])) {
      result = result.concat([raw[i], raw[i + 1]]);
      i++;
      continue;
    }
  }
  return result;
};

export const with_github_raw_url_proxy = (u: string) => {
  return process.env.CLOSE_SOURCE_PROXY?.trim() === "true"
    ? u
    : `${get_github_raw_proxy_url()}/${u}`;
};

export const replace_github_rawcontent = (url: string) => {
  return url.replace(
    "https://raw.githubusercontent.com/",
    "https://mirror.ghproxy.com/https://raw.githubusercontent.com/"
  );
};

export const get_channel_id = (extinf: string) => {
  const regExp = /\#EXTINF:-1([^,]*),(.*)/;
  const name = converter(regExp.exec(extinf)![2]).toLowerCase();
  return name
    .replace(/\[([^\]]*)\]/g, "")
    .replace(/\(([^\)]*)\)/g, "")
    .replace(/（([^）]*)）/g, "")
    .replace(/「([^」]+)」/g, "")
    .replace(/\-/g, "")
    .replace(/\@\@[0-9]*/g, "")
    .replace(/Ⅰ/g, "")
    .replace(/ 8m/g, "")
    .replace(/([^\|]+)\|/g, "")
    .replace(/([^ⅰ]+)ⅰ/g, "")
    .replace(/([\u4e00-\u9fff]+)\s+([\u4e00-\u9fff]+)/g, "$1$2")
    .replace(/ +/g, " ")
    .trim();
};

export const collectM3uSource = (
  extinf: string,
  url: string,
  fn: (k: string, v: string) => void
) => {
  const id = get_channel_id(extinf);
  fn(id, url);
};

export const filter: ISource["filter"] = (
  raw,
  caller,
  collectFn
): [string, number] => {
  const rawArray = handle_m3u(replace_github_raw_proxy_url(raw)).filter(
    (r) => !/#[^E]/.test(r)
  );
  if (!/#EXTM3U/.test(rawArray[0])) {
    rawArray.unshift("#EXTM3U");
  }
  if (caller === "normal" && collectFn) {
    for (let i = 1; i < rawArray.length; i += 2) {
      collectM3uSource(rawArray[i], rawArray[i + 1], collectFn);
    }
  }
  return [converter(rawArray.join("\n")), (rawArray.length - 1) / 2];
};

export const Collector = (
  keyFilter?: (k: string) => boolean,
  valueFilter?: (v: string) => boolean
) => {
  let data = new Map<string, string[]>();
  return {
    collect: (k: string, v: string) => {
      if (!!keyFilter && keyFilter(k)) {
        return;
      }
      if (!!valueFilter && valueFilter(v)) {
        return;
      }
      if (data.has(k)) {
        const vb = data.get(k);
        if (!vb) {
          data.set(k, [v]);
          return;
        }
        if (!vb.includes(v)) {
          data.set(k, [...vb, v]);
          return;
        }
      } else {
        data.set(k, [v]);
      }
    },
    result: () => {
      return data;
    },
  };
};

export const m3u2txt = (m3uArray: string[]) => {
  let groups = new Map<string, string>();
  const channelRegExp = /\#EXTINF:-1([^,]*),(.*)/;
  const groupRegExp = /group-title="([^"]*)"/;
  for (let i = 1; i < m3uArray.length; i += 2) {
    const reg = channelRegExp.exec(m3uArray[i]) as RegExpExecArray;
    const group = groupRegExp.exec(reg[1].trim());
    let g = "";
    if (!group) {
      g = "Undefined";
    } else {
      g = group[1].trim();
    }
    if (groups.has(g)) {
      groups.set(
        g,
        `${groups.get(g)}${reg[2].trim().replace(/\s+/g, "_")},${m3uArray[i + 1]
        }\n`
      );
    } else {
      groups.set(
        g,
        `${reg[2].trim().replace(/\s+/g, "_")},${m3uArray[i + 1]}\n`
      );
    }
  }
  let txt = "";
  groups.forEach((v, k) => {
    txt += `${k},#genre#\n${v}\n`;
  });
  return txt.substring(0, txt.length - 2);
};

const from_infos = new Map([
  ["sn.chinamobile.com", "中国移动陕西"],
  ["sh.chinamobile.com", "中国移动上海"],
  ["hl.chinamobile.com", "中国移动黑龙江"],
  ["js.chinamobile.com", "中国移动江苏"],
  ["cztv.com", "浙江广播电视集团"],
  ["mobaibox.com", "中国移动江苏"],
  ["shaoxing.com.cn", "绍兴网"],
  ["cztvcloud.com", "新蓝云"],
  ["btzx.com.cn", "兵团在线网站"],
  ["hznet.tv", "菏泽网络电视台"],
  ["xntv.tv", "西宁网络电视台"],
  ["jlntv.cn", "吉林广播电视台"],
  ["ybtvyun.com", "延边广播电视台"],
  ["dxhmt.cn", "河南大象融媒体"],
  ["hebyun.com.cn", "冀云"],
  ["nntv.cn", "老友网"],
  ["sjzntv.cn", "燕赵名城网"],
  ["yjtvw.com", "阳江广播电视台"],
  ["amazonaws.com", "亚马逊AWS"],
  ["jstv.com", "荔枝网"],
  ["sgmsw.cn", "韶关民声网"],
  ["grtn.cn", "广东网络广播电视台"],
  ["nbs.cn", "南京广播电视台"],
  ["lsrmw.cn", "溧水融媒网"],
  ["zohi.tv", "福州明珠"],
  ["qingting.fm", "蜻蜓FM"],
  ["hhtv.cc", "云南红河发布"],
  ["wsrtv.com.cn", "文山州广播电视台"],
  ["xsbnrtv.cn", "西双版纳广播电视网"],
  ["live.yantaitv.cn", "烟台网络广播电视台"],
  ["cgtn.com", "CGTN"],
  ["cctv.com", "CCTV"],
  ["cctvplus.com", "CCTV+"],
  ["cnr.cn", "央广网"],
  ["cmvideo.cn", "咪咕"],
  ["douyucdn", "斗鱼"],
  ["cri.cn", "国际在线"],
  ["hndt.com", "河南广播网"],
  ["qxndt.com", "黔西南广播网"],
  ["olelive.com", "欧乐影院"],
  ["chinashadt.com", "千城云科"],
  ["aodianyun.com", "奥点云"],
  ["xiancity.cn", "西安网"],
  ["raw.githubusercontent.com", "Github Raw"],
]);

export const get_from_info = (url: string) => {
  for (const [k, v] of from_infos) {
    if (url.includes(k)) {
      return v;
    }
  }
  const hostRegExp = /([^:]+):\/\/([^/]+)/;
  const host = hostRegExp.exec(url)![2];
  if (/^\[/.test(host)) {
    return "IPv6 直链";
  }
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(host)) {
    return "IPv4 直链";
  }
  return host;
};

export const trimAny = (any: any) => {
  if (Array.isArray(any)) {
    return any.map((a: any) => {
      if (typeof a === "string") {
        return a.trim();
      }
      if (typeof a === "object") {
        return trimAny(a);
      }
    });
  }

  if (typeof any === "object") {
    return Object.fromEntries(
      Object.entries(any).map(([key, value]) => {
        if (typeof value === "string") {
          return [key, value.trim()];
        }
        if (typeof value === "object") {
          return [key, trimAny(value)];
        }
      })
    );
  }

  if (typeof any === "string") {
    return any.trim();
  }

  return any;
};
