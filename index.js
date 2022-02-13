const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


// 
app.use(cors());
app.use(express.json());
require('dotenv').config();


const { MongoClient } = require('mongodb');
const res = require('express/lib/response');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogqtm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)


async function run() {
    try {
        console.log('from function')
        await client.connect();

        // create collection
        const database = client.db("productsList");
        const productsCollection = database.collection("products");
        const reviewsCollection = database.collection("reviews");
        const usersCollection = database.collection("users");
        const boughtProducts =database.collection("bought")



        //         // GET API

        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            console.log('get the collection')
            res.send(products);
        })




        //         // Get reviews
        app.get('/reviews', async (req, res) => {
            const cursor = reviewsCollection.find({});
            const reviews = await cursor.toArray();
            res.send(reviews);
        })




        //         // GET A SINGEL API
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);
            // console.log('from details', product);
            res.json(product)
        })





        //         // for purchase
        //         // GET API
        app.get('/bought', async(req, res)=> {
            
            const cursor = boughtProducts.find({})
            const bought = await cursor.toArray();
            console.log('bought collection', bought)
            res.send(bought)
        })






        //         // for purchase
        //         // POST API
        app.post('/bought', async (req, res) => {
            const bought = req.body;
            console.log('bought', bought);
            const result = await boughtProducts.insertOne(bought);
            console.log(result);
            res.json(result);
        })

        //         // add product
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.json(result)
        })






        //         // POST API for
        //         // users
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            console.log('user',user);
            res.send(result)
        })






        //         // POST API
        //         // reviews
        app.get('/reviews', async (req, res) => {
            const reviews = req.body;
            const result = await reviewsCollection.insertOne(reviews);
            res.json(result);
        })






        //         // make Admin
        app.put('/users/admin', async (req, res) => {
            const user = req.body;
            console.log('admin')
            const filter = { email: user.email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        })







        //         // check admin
                app.get('/users/:email', async (req, res) => {
                    const email = req.params.email;
                    const query = { email: email };
                    const user = await usersCollection.findOne(query);
                    let isAdmin = false;
                    if (user?.role === 'admin') {
                        isAdmin = true;
                    }
                    res.json({ admin: isAdmin });
                })







        //         //DELETE API
        // purchase item
        app.delete('/bought/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await boughtProducts.deleteOne(query)
            res.json(result);
        })

        // products
                app.delete('/products/:id', async (req, res) => {
                    const id = req.params.id;
                    const query = { _id: new ObjectId(id) };
                    const result = await productsCollection.deleteOne(query)
                    console.log(result)
                    res.json(result)
                })






    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello dhoom!')
})

app.listen(port, () => {
    console.log(`Example app listening ${port}`)
})