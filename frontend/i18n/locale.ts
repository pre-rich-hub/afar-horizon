import {notFound} from 'next/navigation'
import {isLocale} from '@/lib/i18n/locales'
export function requireLocale(value: string) {if (!isLocale(value)) notFound(); return value}
