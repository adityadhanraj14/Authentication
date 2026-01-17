import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import authRoutes from './Routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));


app.use(express.static(path.join(__dirname, 'Public')));


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Mongodb Connected successfully');
    
}).catch((err) => {
    console.error('Mongodb Connection Error:', err.message);
    process.exit(1);
});

app.use('/auth',authRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Welcome!</h1><a href="/auth/signup">Go to Signup</a>');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server started on port:${PORT}`);
})

