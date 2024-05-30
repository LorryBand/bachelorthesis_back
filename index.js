import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { UserController } from './controllers/index.js';
import { loginValidation, registerValidation } from './validations.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import { EspController } from './controllers/index.js';
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());
app.use(cors());

/* Регистрация пользователя */
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/dataesp', EspController.EspPost);
app.put('/auth/:id/:deviceId', UserController.putDeviceId)
app.get('/auth/me', checkAuth, UserController.getMe);
app.get('/temperature/:deviceId', EspController.EspGetTemperature);
app.get('/hum/:deviceId', EspController.EspGetHumidity);
app.get('/mq2/:deviceId', EspController.EspGetCO);
app.get('/mq5/:deviceId', EspController.EspGetDang);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
