export type PallasFooterLink = {
  label: string
  href: string
  external?: boolean
}

export type PallasFooterColumn = {
  title: string
  links: PallasFooterLink[]
}

/** 与 WebUI `pallasExternalLinks` / 主仓 README 社区区块对齐 */
export const PALLAS_FOOTER_COLUMNS: PallasFooterColumn[] = [
  {
    title: '生态',
    links: [
      { label: 'Pallas-Bot', href: 'https://github.com/PallasBot/Pallas-Bot', external: true },
      { label: 'Pallas-Bot-AI', href: 'https://github.com/PallasBot/Pallas-Bot-AI', external: true },
      { label: 'NoneBot2', href: 'https://nonebot.dev/', external: true },
      { label: 'NapCat', href: 'https://github.com/NapNeko/NapCatQQ', external: true },
    ],
  },
  {
    title: '工具',
    links: [
      { label: '在线文档', href: '/', external: false },
      { label: 'Web 控制台', href: '/plugins/pallas_webui', external: false },
      { label: '标准部署', href: '/deploy/deployment', external: false },
      { label: 'Docker 部署', href: '/deploy/docker', external: false },
    ],
  },
  {
    title: '社区',
    links: [
      { label: '开发者 · 牛牛听话!', href: 'https://qm.qq.com/q/yIiAajYwms', external: true },
      { label: '拉牛牛 · 西海福牛养殖基地', href: 'https://qm.qq.com/q/5GjZ2xHeb6', external: true },
      { label: '拉牛牛 · 牛牛工坊', href: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=snSe5PkcmHZrD0OA5Wzl2RAnM-qoAMUc&authKey=T%2FQlcyy31oE7YyMDMd7Yys7utl5a9jP84VYgnknra8Knsq3BhEy5TrwiWK7rG8j6&noverify=0&group_code=1043301356', external: true },
      { label: '更多 QQ 群', href: '/about', external: false },
    ],
  },
]
