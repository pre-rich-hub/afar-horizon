import {useTranslations} from 'next-intl'
const keys: Record<string, string> = {"Expedition": "expedition", "Private": "private", "Day Expedition": "dayExpedition", "Cultural": "cultural", "Trekking": "trekking", "Photography": "photography", "Geology": "geology", "Culture": "culture", "Journeys": "journeys", "Landscapes": "landscapes", "Heritage": "heritage", "Danakil": "danakil", "Afar": "afar", "Planning": "planning", "Field Notes": "fieldNotes", "Destinations": "destinations", "Journey": "journey", "Destination": "destination", "Price on request": "priceOnRequest"}
export function useCatalogueLabel() {
 const tr = useTranslations('Catalogue')
 return (value: string) => value.split(' · ').map(part => keys[part] ? tr(keys[part]) : part).join(' · ')
}
export function useDuration() {
 const tr = useTranslations('Catalogue')
 return (tour: {days: string; nights: number}) => tour.nights ? `${tour.days} / ${tr('nights', {count: tour.nights})}` : tour.days
}
