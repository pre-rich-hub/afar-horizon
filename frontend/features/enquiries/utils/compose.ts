// Lays every answer out in the contact message so nothing is lost.
export type Answers = Record<string, string | string[]>

export function compose(title: string, answers: Answers) {
  const lines = [title, '']
  for (const [label, value] of Object.entries(answers)) {
    const v = Array.isArray(value) ? value.join(', ') : value
    if (v) lines.push(`${label}: ${v}`)
  }
  return lines.join('\n')
}
