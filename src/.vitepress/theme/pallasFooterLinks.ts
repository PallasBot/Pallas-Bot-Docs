export type PallasFooterLink = {
  label: string
  href: string
  external?: boolean
  /** 本地 `/assets/...` 路径 */
  avatar?: string
  /** 远程头像 URL */
  avatarSrc?: string
  /** QQ 号或群号 */
  qqNk?: number | string
  /** 为 true 时使用群头像 CDN */
  qqGroup?: boolean
}

export type PallasFooterColumn = {
  title: string
  links: PallasFooterLink[]
}

const QQ_ICON =
  'https://api.iconify.design/simple-icons:qq.svg?color=%2312b7f5'

/** 与 WebUI `pallasExternalLinks` / 主仓 README 社区区块对齐 */
export const PALLAS_FOOTER_COLUMNS: PallasFooterColumn[] = [
  {
    title: '生态',
    links: [
      {
        label: 'Pallas-Bot',
        href: 'https://github.com/PallasBot/Pallas-Bot',
        external: true,
        avatar: '/assets/pallas-priest.png',
      },
      {
        label: 'Pallas-Bot-AI',
        href: 'https://github.com/PallasBot/Pallas-Bot-AI',
        external: true,
        avatarSrc: 'https://github.com/PallasBot.png?s=40',
      },
      {
        label: 'NoneBot2',
        href: 'https://nonebot.dev/',
        external: true,
        avatarSrc: 'https://nonebot.dev/logo.png',
      },
      {
        label: 'NapCat',
        href: 'https://github.com/NapNeko/NapCatQQ',
        external: true,
        avatarSrc: 'https://github.com/NapNeko.png?s=40',
      },
    ],
  },
  {
    title: '工具',
    links: [
      {
        label: '在线文档',
        href: '/',
        external: false,
        avatar: '/assets/pallas-priest.png',
      },
      {
        label: 'Web 控制台',
        href: '/plugins/pallas_webui',
        external: false,
        avatar: '/assets/pallas-priest.png',
      },
      {
        label: '标准部署',
        href: '/deploy/deployment',
        external: false,
        avatar: '/assets/pallas-priest.png',
      },
      {
        label: 'Docker 部署',
        href: '/deploy/docker',
        external: false,
        avatar: '/assets/pallas-priest.png',
      },
    ],
  },
  {
    title: '社区',
    links: [
      {
        label: '开发者 · 牛牛听话!',
        href: 'https://qm.qq.com/q/yIiAajYwms',
        external: true,
        avatarSrc: QQ_ICON,
      },
      {
        label: '拉牛牛 · 牢牛今天寄了吗',
        href: 'https://qun.qq.com/universal-share/share?ac=1&authKey=ED2GgLVICB%2F%2BCVuZKtMrOFBr%2F8foYDU2DE80dFji9gvwaTb0GNitvZv2c8ifkLfR&busi_data=eyJncm91cENvZGUiOiI3ODkzMTE0MjAiLCJ0b2tlbiI6IlFZN2EyanJuSGEwR3Exb0RWNjYxSldLT3hPWSt2V0o5QVhqYktHNnVyZFlQbFJ2MlNIcDlpNC9zRVk0TS83TWIiLCJ1aW4iOiIzNDE1NzUwMTc4In0%3D&data=KMV9QtwR8GD1IJe2iba5hugcJCZcWsmv9vGhWZEnOIp0wHpnE7k7fVBKxJHgbYs7Ym4xKuar30OLIqVFySDPmA&svctype=4&tempid=h5_group_info',
        external: true,
        qqNk: 789311420,
        qqGroup: true,
      },
      {
        label: '拉牛牛 · 西海福牛养殖基地',
        href: 'https://qm.qq.com/q/5GjZ2xHeb6',
        external: true,
        avatarSrc: QQ_ICON,
      },
      {
        label: '拉牛牛 · 牛牛工坊',
        href: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=snSe5PkcmHZrD0OA5Wzl2RAnM-qoAMUc&authKey=T%2FQlcyy31oE7YyMDMd7Yys7utl5a9jP84VYgnknra8Knsq3BhEy5TrwiWK7rG8j6&noverify=0&group_code=1043301356',
        external: true,
        qqNk: 1043301356,
        qqGroup: true,
      },
      {
        label: '更多 QQ 群',
        href: '/about',
        external: false,
        avatarSrc: QQ_ICON,
      },
    ],
  },
]
