const express = require('express')
const app = express()
const port = process.env.port || 8081

app.get('/', (req, res) => {
  res.send('Welcome to api and set ssl')
})

app.get('/api', (req, res) => {
  res.status(200).json({
    Hello: 'World',
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
