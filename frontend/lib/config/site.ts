import { defaultImage } from './cloudinary'

type Environment = Record<string, string | undefined>

export function getSiteConfig(env: Environment = process.env) {
  const productionBuild = env.NODE_ENV === 'production'
  if (!env.SITE_URL && productionBuild) {
    throw new Error('SITE_URL must be set to the confirmed production origin (https://www.afarhorizon.com).')
  }

  const url = new URL(env.SITE_URL ?? 'http://localhost:3000')
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
  if (
    url.username || url.password || url.pathname !== '/' || url.search || url.hash ||
    (url.protocol !== 'https:' && !(url.protocol === 'http:' && local && !productionBuild)) ||
    (productionBuild && local)
  ) {
    throw new Error('SITE_URL must be an HTTPS origin without credentials, a path, query or fragment. Localhost is development-only.')
  }

  if (env.SEO_INDEXABLE !== undefined && !['true', 'false'].includes(env.SEO_INDEXABLE)) {
    throw new Error('SEO_INDEXABLE must be true or false.')
  }
  if (env.DEPLOYMENT_ENV && !['production', 'preview', 'staging', 'development'].includes(env.DEPLOYMENT_ENV)) {
    throw new Error('DEPLOYMENT_ENV must be production, preview, staging or development.')
  }

  const markers = [env.DEPLOYMENT_ENV, env.VERCEL_ENV, env.CONTEXT].filter(Boolean)
  const confirmedProduction = markers.includes('production')
  const preview = markers.some(marker => marker !== 'production')

  return {
    name: 'Afar Horizon Expeditions',
    url: url.origin,
    defaultImage,
    production: productionBuild && confirmedProduction && !preview,
    indexable: productionBuild && env.SEO_INDEXABLE === 'true' && confirmedProduction && !preview,
  }
}

export const site = getSiteConfig()
