import { useState } from 'react'

export function useChips(initial: string[] = []) {
  const [selected, setSelected] = useState<string[]>(initial)
  const toggle = (v: string) =>
    setSelected((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
  return { selected, toggle }
}
