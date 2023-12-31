const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
//LegoLand
//Lafo56l1YY0ZTK8E




 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajs1x35.mongodb.net/?retryWrites=true&w=majority`;
 console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const ToyCollection = client.db('toyDB').collection('toys'); 
     

    app.get('/toys', async(req, res)=>{
      console.log(req.query.selleremail);
      let query = {};
      if(req.query?.selleremail){
        query = {selleremail: req.query.selleremail }
      }
      const result = await ToyCollection.find().toArray();
      res.send(result);
     })

   app.get('/toys', async(req, res)=>{
    const cursor = ToyCollection.find();
    const result = await cursor.toArray();
    res.send(result);
   })
    app.post('/toys', async(req, res)=>{
      const AddedToys = req.body;
      console.log(AddedToys);
      const result = await ToyCollection.insertOne(AddedToys);
      res.send(result);
    })

    app.delete('/toys/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await ToyCollection.deleteOne(query);
      res.send(result);
    } )



    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=> {

    res.send('Toyland is running')
}  ) 

app.listen(port, () => {
    console.log(`Toyland server is running on port: ${port}`)
}) 