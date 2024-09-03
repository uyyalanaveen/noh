import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.use('/api/auth', router);


connectDB();

app.listen(3000, () => {

  console.log('Example app listening on port 3000!');
});



console.log('server started');


