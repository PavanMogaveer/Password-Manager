const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')
const cors=require('cors')
// or as an es module:
// import { MongoClient } from 'mongodb'
app.use(bodyparser.json())
app.use(cors())

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passguard';
client.connect();



app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.send(req.body)
})


app.delete('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
  res.send(req.body)
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})