/** QQ 头像（腾讯 CDN），与 WebUI `botDisplay.qqAvatarUrl` 对齐。 */
export function qqAvatarUrl(uin: number | string): string {
  const n = typeof uin === 'string' ? parseInt(uin.replace(/\s/g, ''), 10) : uin
  if (!Number.isFinite(n) || n < 1) return ''
  return `https://q1.qlogo.cn/g?b=qq&nk=${n}&s=160`
}

/** QQ 群头像（腾讯 CDN）。 */
export function qqGroupAvatarUrl(groupCode: number | string): string {
  const n = typeof groupCode === 'string' ? parseInt(groupCode.replace(/\s/g, ''), 10) : groupCode
  if (!Number.isFinite(n) || n < 1) return ''
  return `https://p.qlogo.cn/gh/${n}/${n}/100`
}
