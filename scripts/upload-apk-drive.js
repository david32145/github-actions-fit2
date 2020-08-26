const Dropbox = require('dropbox').Dropbox
const fetch = require('isomorphic-fetch')
const path = require('path')
const fs = require('fs')
const version = require('../package.json').version

const dropbox = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch
})

const apkPath = path.resolve(__dirname, '..', 'mobile', 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk')
const file = fs.createReadStream(apkPath)

dropbox.filesUpload({
  contents: file,
  path: `/todoApp-${version}.apk`,
}).then(console.log)
  .catch(console.error)