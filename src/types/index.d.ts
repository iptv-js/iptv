export interface ISource {
  name: string;
  f_name: string;
  url: string;
  filter: (
    raw: string,
    caller: "normal" | "skip" | "rollback",
    collectFn?: (k: string, v: string) => void
  ) => [string, number];
}
export interface DSource {
  name: string;
  f_name: string;
  idx?: string[];
  url: string;
}

export interface IREADMEMirrorSite {
  protocol: "http" | "https";
  url: string;
  frequence: string;
  idc: string;
  provider: string;
}

export interface IREADMESource {
  name: string;
  f_name: string;
  count?: number | undefined;
}

export interface ICustomRuleAppend {
  name: string;
  url: string;
  extinf?: string;
}

export interface ICustomRule {
  upstream: string;
  exclude?: string[];
  include?: string[];
  append?: ICustomRuleAppend[];
}

export interface ICustom {
  rules: ICustomRule[];
}

export interface IChannelSource {
  name: string;
  f_name: string;
}

export type TChannelsSources = IChannelSource[];

export interface IChannel {
  name: string;
  m3u: string;
  count: number | undefined;
}

export interface IEPG {
  name: string;
  epg: string;
}

export interface IChannelsResult {
  builderVersion?: number; // 构建版本标识符
  channels: IChannel[];
  epgs: IEPG[];
  updated_at: number;
}

export interface IREADMESource {
  name: string;
  f_name: string;
  count?: number | undefined;
}

export interface IEnvSourcesProxyGitHubRawContent {
  close?: boolean;
  custom?: string;
}

export interface IEnvSourcesProxy {
  github_raw_content?: IEnvSourcesProxyGitHubRawContent;
}

export interface IEnvSourcesRollback {
  urls?: string[];
}

export interface IEnvSources {
  rollback?: IEnvSourcesRollback;
  proxy?: IEnvSourcesProxy;
}

export interface IEnvExtendsIPTVChecker {
  enable?: boolean;
  url?: string;
}

export interface IEnvExtends {
  iptv_checker?: IEnvExtendsIPTVChecker;
}

export interface IEnv {
  sources?: IEnvSources;
  extends?: IEnvExtends;
}

export interface ICustomRuleAppend {
  name: string;
  url: string;
  extinf?: string;
}

export interface ICustomRuleReplacerItem {
  pattern: string;
  type: "string" | "regexp";
  flags?: string;
  target: string;
}

export interface ICustomRuleReplacer {
  extinf?: ICustomRuleReplacerItem[];
  url?: ICustomRuleReplacerItem[];
}

export interface ICustomRule {
  upstream: string;
  exclude?: string[];
  include?: string[];
  append?: ICustomRuleAppend[];
  replacer?: ICustomRuleReplacer;
}

export interface ICustom {
  rules: ICustomRule[];
}

interface ITvBoxLiveChannel {
  name: string;
  urls: string[];
}

interface ITvBoxLive {
  group: string;
  channels: ITvBoxLiveChannel[];
}

interface ITvBoxJson {
  lives: ITvBoxLive[];
}

interface ITvBoxLiveSrc {
  name: string;
  f_name: string;
}

export type TREADMEEPGSources = TEPGSource[];

export type TREADMEMirrorSitesMatrix = IREADMEMirrorSite[];

export type TSources = ISource[];

export type TEPGSource = Omit<ISource, "filter">;

export type TREADMESources = IREADMESource[];
