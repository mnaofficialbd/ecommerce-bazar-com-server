const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjc2s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const apiDataCollection = client.db('apiDataDashboard').collection('apiData');

        //all apiDatas
        app.get('/apiData', async (req, res) => {
            const query = {};
            const curser = apiDataCollection.find(query);
            const apiDatas = await curser.toArray();
            res.send(apiDatas)
        });

        //one item
        app.get('/apiData/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const apiData = await apiDataCollection.findOne(query);
            res.send(apiData)
        });

        /* //add item
        app.post('/item', async (req, res) => {
            const addItem = req.body;
            const result = await apiDataCollection.insertOne(addItem);
            res.send(result)
        });

        //delete item
        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await apiDataCollection.deleteOne(query);
            res.send(result)
        }); */


    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('VISUALIZATION DASHBOARD')
})

app.listen(port, () => {
    console.log("Running", port);
})