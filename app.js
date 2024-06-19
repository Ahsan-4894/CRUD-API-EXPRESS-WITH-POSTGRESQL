import express from 'express'
import dotenv  from 'dotenv';
dotenv.config();
import route from './routes/studentRoute.js';
const app = express();
const PORT = process.env.PORT

//use json format 
app.use(express.json());

app.use("/user", route);
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})