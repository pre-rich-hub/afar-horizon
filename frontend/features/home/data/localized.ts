import {getLocalizedData, useLocalizedData} from '@/lib/i18n/feature-copy'
import type {Locale} from '@/lib/i18n/locales'
import l0 from './overlays/fr.json'
import l1 from './overlays/es.json'
import l2 from './overlays/de.json'
import l3 from './overlays/zh-Hans.json'
const overlays = {fr: l0, es: l1, de: l2, 'zh-Hans': l3}
export function getHomeCopy<T>(dataset: string, base: T, locale: Locale): T {return getLocalizedData(overlays, dataset, base, locale)}
export function useHomeCopy<T>(dataset: string, base: T): T {return useLocalizedData(overlays, dataset, base)}
