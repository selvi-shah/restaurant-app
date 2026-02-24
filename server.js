import express from 'express';
import dotenv from 'dotenv';
import connection from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

//dot en configuration
dotenv.config();

//connection
const db = await connection();

//middlewares
app.use(express.json());


app.get('/', (req, resp) => {
    return resp.status(200).send("<h1>Welcome to my webpage</h1>");
});

app.get("/test", async (req, resp) => {
    const collectionName="food";
    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();
    resp.send(result)
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);


//PORT
const PORT = process.env.PORT || 8000;

console.log("Starting server...");

app.listen(PORT, () => {
    console.log(`Yes Server is running on port ${PORT}`)
});
