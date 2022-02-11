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
//         const purcheasedCar = database.collection("purcheased");
//         const usersCollection = database.collection("users");



//         // GET API
        
        app.get('/products', async(req, res)=> {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            console.log('get the collection')
            res.send(products);
        })




//         // Get reviews
        app.get('/reviews', async (req, res) => {
            const cursor = reviewsCollection.find({});
            const reviews = await cursor.toArray();
            console.log('getting from reviews',reviews)
            res.send(reviews);
        })
//         app.get('/reviews', async (req, res) => {
//             const cursor = reviewsCollection.find({});
//             const reviews = await cursor.toArray();
//             console.log('getting from reviews')
//             res.send(reviews);
//         })

        
        
        
//         // GET A SINGEL API
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);
            // console.log('from details', product);
            res.json(product)
        })
//         app.get('/details/:id', async (req, res) => {
//             const id = req.params.id;
//             console.log('specific id', id)
//             const query = { _id: ObjectId(id) };
//             const car = await carsCollection.findOne(query);
//             console.log('from details', car)
//             res.json(car)
//         })

        
        
        
        
//         // for purchase
//         // GET API
//         app.get('/purcheased', async (req, res) => {
//             const cursor = purcheasedCar.find({});
//             const purcheased = await cursor.toArray();
//             console.log("showing from purcheased", purcheased)
//             res.send(purcheased);
//         })



        
        
        
//         // for purchase
//         // POST API
//         app.post('/purcheased', async (req, res) => {
//             const purcheased = req.body;
//             console.log('hitting', purcheased)
//             const result = await purcheasedCar.insertOne(purcheased);
//             console.log(result)
//             res.json(result)
//         })

//         // add product
//         app.post('/products', async (req, res) => {
//             const products = req.body;
//             console.log('hitting', products)
//             const result = await carsCollection.insertOne(products);
//             console.log(result)
//             res.json(result)
//         })



        
        
        
//         // POST API for
//         // users
//         app.post('/users', async (req, res) => {
//             const user = req.body;
//             const result = await usersCollection.insertOne(user);
//             console.log(result);
//             res.json(result);
//         });


        
        
        
        
//         // POST API
//         // reviews
//         app.post('/reviews', async (req, res) => {
//             const reviews = req.body;
//             console.log('hitting', reviews)
//             const result = await reviewsCollection.insertOne(reviews);
//             console.log(result)
//             res.json(result)
//         })

        
        
        
        
        
//         // make Admin
//         app.put('/users/admin', async (req, res) => {
//             const user = req.body;
//             console.log('put', user)
//             const filter = { email: user.email };
//             const updateDoc = { $set: { role: 'admin' } };
//             const result = await usersCollection.updateOne(filter, updateDoc);
//             res.json(result);
//         })
        
        
        
        
        
        
        
//         // check admin
//         app.get('/users/:email', async (req, res) => {
//             const email = req.params.email;
//             const query = { email: email };
//             const user = await usersCollection.findOne(query);
//             let isAdmin = false;
//             if (user?.role === 'admin') {
//                 isAdmin = true;
//             }
//             res.json({ admin: isAdmin });
//         })


        
        
        
        
        
//         //DELETE API
//         app.delete('/purcheased/:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await purcheasedCar.deleteOne(query)
//             console.log(result)
//             res.json(result)
//         })
//         app.delete('/products/:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await carsCollection.deleteOne(query)
//             console.log(result)
//             res.json(result)
//         })






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