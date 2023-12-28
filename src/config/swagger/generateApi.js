import fs from 'node:fs'

import openapiTS from 'openapi-typescript'

const localPath = new URL(`./swagger.json`, import.meta.url)
const result = await openapiTS(localPath)
fs.writeFileSync(`./src/api.ts`, result)
