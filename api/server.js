import serverless from 'serverless-http'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve backend path and import the app
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const backendIndex = path.join(__dirname, '..', 'backend', 'index.cjs')

let appModule
try {
  appModule = await import(`file://${backendIndex}`)
} catch (e) {
  // attempt require fallback (in case CJS)
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    appModule = require(backendIndex)
  } catch (err) {
    console.error('Failed to load backend app for serverless:', err)
    throw err
  }
}

const app = appModule && (appModule.app || appModule.default || appModule)
if (!app) throw new Error('Backend app not found for serverless wrapper')

export const handler = serverless(app)
