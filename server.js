const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')

//express app
const app = express()

//middleware
app.use(express.json()) // for parsing application/json

//port
const port = 3000

//Routing
app.get('/', (req, res) => {
  res.send('Hello Node API!')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Abiola!')
  })


app.post('/product', async (req, res) => {
        try {
            const product = await Product.create(req.body)
            res.status(200).json(product)
            
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: error.message})
        }   
    

  })



mongoose.
connect('mongodb+srv://admin:abiola123@abiolaapi.vyf9c.mongodb.net/?retryWrites=true&w=majority&appName=AbiolaAPI')
.then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => {
        console.log(`Node API app is running on port 3000`)
      })
    
}).catch(err => {
    console.log(err)
})

