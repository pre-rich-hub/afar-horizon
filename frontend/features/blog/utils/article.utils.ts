import type { ArticleParagraph } from '../types/post.types'

// Plain text remains supported; editorial links never require raw HTML.
export function articleParagraph(value: string | ArticleParagraph) {
  const paragraph = typeof value === 'string' ? { text: value } : value
  const matches = (paragraph.links ?? []).map(link => ({ ...link, start: paragraph.text.indexOf(link.text) }))
    .filter(link => link.text && link.start >= 0)
    .sort((a, b) => a.start - b.start)
  const parts: { text: string; href?: string }[] = []
  let cursor = 0
  for (const link of matches) {
    if (link.start < cursor) continue
    if (link.start > cursor) parts.push({ text: paragraph.text.slice(cursor, link.start) })
    parts.push({ text: link.text, href: link.href })
    cursor = link.start + link.text.length
  }
  if (cursor < paragraph.text.length) parts.push({ text: paragraph.text.slice(cursor) })
  return { ...paragraph, parts }
}
