import app from './app'

const PORT = process.env.PORT || 3333

app.listen(PORT, function (...err:any[]) {
  if (err && err.length) {
    console.log('An error ocurred')
    console.error(err)
  } else {
    console.log(`Server is running in http://localhost${PORT}`)
  }
})
