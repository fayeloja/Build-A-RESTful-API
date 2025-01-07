const express = require('express')
const app = express()
const port = 3000


//Routing
app.get('/', (req, res) => {
  res.send('Hello Node API!')
})

app.listen(3000, () => {
  console.log(`Node API app is running on port 3000`)
})