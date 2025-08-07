const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
app.use(express.json());

// Configura la conexión a MongoDB
const uri = "mongodb+srv://ialfper:ialfper21@alumnos.zoinj.mongodb.net/alumnos?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Función para conectar a la base de datos y obtener las colecciones
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB Atlas");
    const db = client.db('minecraft');
    return {
      cartas: db.collection('cartas'),
      invetario: db.collection('inventario')
      
    };
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw new Error('Error al conectar a la base de datos');
  }
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Endpoint GET para obtener usuarios
app.get('/api/cartitas', async (req, res) => {
  try {
    const { cartas } = await connectToMongoDB();
    const lista_cartas = await cartas.find().toArray();
    console.log("cartitas:", lista_cartas);
    res.json(lista_cartas);
  } catch (error) {
    console.error("Error al obtener al cartas:", error);
    res.status(500).json({ error: 'Error al obtener las cartas' });
  }
});

app.post('/api/inventario', async (req, res) => {
  try {
    const { inventario } = await connectToMongoDB();
    const inventario_stok = await inventario.find().toArray();
    console.log("inventario:", inventario_stok);
    res.json(inventario_stok);
  } catch (error) {
    console.error("Error al guardar el inventario:", error);
    res.status(500).json({ error: 'Error al guardar el inventario' });
  }
});


app.get('/api/invetarioDatos', async (req, res) => {
  try {
    const { inventario } = await connectToMongoDB();
    const inventario_stok = await inventario.find().toArray();
    console.log("inventario:", inventario_stok);
    res.json(inventario_stok);
  } catch (error) {
    console.error("Error al obtener datos del inventyario:", error);
    res.status(500).json({ error: 'Error al obtener las cartas' });
  }
});
module.exports = app;