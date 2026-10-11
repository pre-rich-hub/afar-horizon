export type LegalPage = {
  title: string
  intro: string
  sections: { title: string; paragraphs: string[]; link?: { label: string; href: string } }[]
}
