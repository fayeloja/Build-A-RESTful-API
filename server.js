const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')

//Instance of Express app
const app = express()

//middleware
app.use(express.json()) // for parsing application/json 

app.use(express.urlencoded({extended: false})) // for parsing form encoded data

//port
const port = 3000

//Routing
app.get('/', (req, res) => {
  res.send('Hello Node API!')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Abiola!')
  })

// Fetch all products from DB
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }   
})  

// Fetch a single product from DB

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }   
})


// Create a product in DB
app.post('/product', async (req, res) => {
        try {
            const product = await Product.create(req.body)
            res.status(201).json(product)
            
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: error.message})
        }   
    

  })

// Update a product in DB
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);   
        
        //if we cannot find any product in the DB with same ID
        if (!product) {
            return res.status(404).json({message: 'Product with not found'})
        } 
        //load updated data and present it
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Delete a product from DB
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id); 

        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }

        res.status(200).json(product);

    } catch (error) {
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

