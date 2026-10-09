export type GalleryItem = { id: number; imageUrl: string; tourId: number | null; tour?: { id: number; name: string } | null }

export type Tour = { id: number; name: string }
