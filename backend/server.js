
import express from 'express'; 
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import * as dotenv from 'dotenv';
import connectDB from './src/config/connection.js';
import morgan from 'morgan';
import cors from 'cors';
import user from './src/routes/userRoute.js';
import User from './src/models/User.js'
import course from './src/routes/courseRoute.js';
import quiz from './src/routes/quizRoute.js';
import question from './src/routes/questionRoute.js';
import progress from './src/routes/progressRoute.js';
import document from './src/routes/DocRoute.js'
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import logger from './src/logger/logger.js';
import { limiters } from './src/middlewares/rateLimit/rate-limit.js';
import crypto from 'crypto';

dotenv.config();



// create express app
const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: true,
      credentials: true, 
      allowedHeaders: ['Content-Type', 'X-Csrf-Token'],
      exposedHeaders: ['X-Csrf-Token'],
    })
  );
app.use(cookieParser()); 
app.use(limiters);
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`IP người truy cập: ${ip}`); // Ghi lại địa chỉ IP
  next(); // Chuyển tiếp yêu cầu
});

// // Set up logger
// app.use(morgan('combined', {
//   stream: {
//     write: message => logger.info(message.trim())
//   }
// }));

// Middleware to set Cache-Control headers
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "https://www.google.com/recaptcha/", 
      "https://www.gstatic.com/"
    ],
    styleSrc: [
      "'self'",
      "https://fonts.googleapis.com"
    ],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com"
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https://www.google.com",
    ],
    connectSrc: [
      "'self'",
      "https://www.google.com/recaptcha/", 
    ],
    frameSrc: [
      "'self'",
      "https://www.google.com/recaptcha/", 
    ]
  }
}));


// connect to database
connectDB(process.env.MONGODB_URI);

let createUser = async(username,email,password,role,verifyToken,isVerified) => {
  let verificationToken = crypto.randomBytes(32).toString('hex');
const newUser = new User({ username, email, password,role, verifyToken, verificationToken,isVerified });
await newUser.save();
console.log(username + "created")
}

// createUser("admin","admin@gmail.com","12345678aA@","admin")
// createUser("test123","duongvip1410@gmail.com","12345678aA@","user",true)
// createUser("john","john@gmail.com","12345678aA@","user",true)
// createUser("foo","foo@gmail.com","12345678aA@","user",true)
// createUser("duong","duong@gmail.com","12345678aA@","user",true)
// createUser("quang","quang@gmail.com","12345678aA@","user",true)
// createUser("peter","peter@gmail.com","12345678aA@","user",true)
// createUser("susan","susan@gmail.com","12345678aA@","user",true)
// // Routes
app.use('/api/v1/user', user);
app.use('/api/v1/course', course);
app.use('/api/v1/quiz', quiz);
app.use('/api/v1/question', question);  
app.use('/api/v1/progress', progress); 
app.use('/api/v1/document', document ); 


// Tạo route để upload file



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
