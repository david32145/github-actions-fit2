const path = require('path')
const fs = require('fs')

if(process.env.REACT_APP_API_URL && process.env.REACT_NATIVE_API_URL) {
  const WEB_API = process.env.REACT_APP_API_URL
  const MOBILE_API = process.env.REACT_NATIVE_API_URL

  const webEnvPath = path.resolve(__dirname, 'web', '.env')
  const mobileEnvPath = path.resolve(__dirname, 'mobile', '.env')

  fs.writeFileSync(webEnvPath, `REACT_APP_API_URL=${WEB_API}\n`, {
    encoding: 'utf8',
    flag: 'w'
  })
  fs.writeFileSync(mobileEnvPath, `REACT_NATIVE_API_URL=${MOBILE_API}\n`, {
    encoding: 'utf8',
    flag: 'w'
  })
  console.log("Env vars has been initialized")
} else {
  throw new Error('You must set REACT_APP_API_URL and REACT_NATIVE_API_URL vars')
}
