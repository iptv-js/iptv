import fs from "node:fs";
import path from "node:path";
import { hrtime } from "node:process";
import type { TEPGSource, ISource } from "../types";
import { with_github_raw_url_proxy, m3u2txt } from "../utils";

export const getContent = async (src: ISource | TEPGSource) => {
  const now = hrtime.bigint();
  const url = /^https:\/\/raw.githubusercontent.com\//.test(src.url)
    ? with_github_raw_url_proxy(src.url)
    : src.url;
  const res = await fetch(url);
  return [res.ok, await res.text(), now];
};

export const writeM3u = (name: string, m3u: string) => {
  if (!fs.existsSync(path.join(path.resolve(), "dist"))) {
    fs.mkdirSync(path.join(path.resolve(), "dist"));
  }
  fs.writeFileSync(path.join(path.resolve(), "dist", `${name}.m3u`), m3u);
};

export const writeSources = (
  name: string,
  f_name: string,
  sources: Map<string, string[]>
) => {
  let srcs = {};
  for (const [k, v] of sources) {
    srcs[k] = v;
  }
  if (!fs.existsSync(path.resolve("dist", "sources"))) {
    fs.mkdirSync(path.resolve("dist", "sources"));
  }
  fs.writeFileSync(
    path.resolve("dist", "sources", `${f_name}.json`),
    JSON.stringify({
      name,
      sources: srcs,
    })
  );
};

export const writeM3uToTxt = (name: string, f_name: string, m3u: string) => {
  const m3uArray = m3u.split("\n");
  let txt = m3u2txt(m3uArray);
  if (!fs.existsSync(path.join(path.resolve(), "dist", "txt"))) {
    fs.mkdirSync(path.join(path.resolve(), "dist", "txt"));
  }
  fs.writeFileSync(
    path.join(path.resolve(), "dist", "txt", `${f_name}.txt`),
    txt
  );
};

export const mergeTxts = () => {
  const txts_p = path.resolve("dist", "txt");
  const files = fs.readdirSync(txts_p);
  const txts = files
    .map((d) => fs.readFileSync(path.join(txts_p, d).toString()))
    .join("\n");
  fs.writeFileSync(path.join(txts_p, "merged.txt"), txts);
};

export const mergeSources = () => {
  const sources_p = path.resolve("dist", "sources");
  const files = fs.readdirSync(sources_p);
  const res = {
    name: "Sources",
    sources: {},
  };
  files.forEach((f) => {
    const so = JSON.parse(
      fs.readFileSync(path.join(sources_p, f), "utf-8")
    ).sources;
    Object.keys(so).forEach((k) => {
      if (!res.sources[k]) {
        res.sources[k] = so[k];
      } else {
        res.sources[k] = [...new Set([...res.sources[k], ...so[k]])];
      }
    });
  });
  fs.writeFileSync(path.join(sources_p, "sources.json"), JSON.stringify(res));
};

export const writeEpgXML = (f_name: string, xml: string) => {
  if (!fs.existsSync(path.join(path.resolve(), "dist", "epg"))) {
    fs.mkdirSync(path.join(path.resolve(), "dist", "epg"));
  }
  fs.writeFileSync(path.resolve("dist", "epg", `${f_name}.xml`), xml);
};

export const writeMovieJson = (f_name: string, json: string) => {
  if (!fs.existsSync(path.join(path.resolve(), "dist", "movie"))) {
    fs.mkdirSync(path.join(path.resolve(), "dist", "movie"));
  }
  fs.writeFileSync(path.resolve("dist", "movie", `${f_name}`), json);
};

const cleanDir = (p: string) => {
  if (fs.existsSync(p)) {
    fs.readdirSync(p).forEach((file) => {
      const isDir = fs.statSync(path.join(p, file)).isDirectory();
      if (isDir) {
        cleanDir(path.join(p, file));
      } else {
        fs.unlinkSync(path.join(p, file));
      }
    });
  }
};

const copyDir = (src: string, dest: fs.PathLike, callback: { (): void; (arg0: NodeJS.ErrnoException): void; }) => {
  const copy = (copySrc: any, copyDest: any) => {
    fs.readdir(copySrc, (err, list) => {
      if (err) {
        callback(err);
        return;
      }
      list.forEach((item) => {
        const ss = path.resolve(copySrc, item);
        fs.stat(ss, (err, stat) => {
          if (err) {
            callback(err);
          } else {
            const curSrc = path.resolve(copySrc, item);
            const curDest = path.resolve(copyDest, item);
            if (stat.isFile()) {
              fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest));
            } else if (stat.isDirectory()) {
              fs.mkdirSync(curDest, { recursive: true });
              copy(curSrc, curDest);
            }
          }
        });
      });
    });
  };

  fs.access(dest, (err) => {
    if (err) {
      fs.mkdirSync(dest, { recursive: true });
    }
    copy(src, dest);
  });
};

export const cleanFiles = () => cleanDir(path.join(path.resolve(), "dist"));
export const copyFiles = () =>
  copyDir(
    path.join(path.resolve(), "src/public"),
    path.join(path.resolve(), "dist"),
    () => { }
  );