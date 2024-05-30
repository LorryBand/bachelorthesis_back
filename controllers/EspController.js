import EspModel from "../models/Espdata.js";
import UserModel from "../models/User.js";

export const EspPost = async (req, res) => {
  try {
    const { esp, mq2, mq5, humidity, temperature } = req.body;
    const newData = new EspModel({ esp, mq2, mq5, humidity, temperature });
    await newData.save();
    res.status(201).send("Success");
  } catch (error) {
    res.status(400).send({ error: "Failed to save data" });
  }
};

export const EspGetTemperature = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const user = await UserModel.findOne({ deviceId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const espData = await EspModel.find({ esp: deviceId }).sort({ createdAt: 1 });
    const temperatureData = espData.map(data => ({
      temperature: parseFloat(data.temperature),
      timestamp: data.createdAt,
    }));

    res.json(temperatureData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const EspGetHumidity = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const user = await UserModel.findOne({ deviceId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const espData = await EspModel.find({ esp: deviceId }).sort({ createdAt: 1 });
    const temperatureData = espData.map(data => ({
      temperature: parseFloat(data.humidity),
      timestamp: data.createdAt,
    }));

    res.json(temperatureData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const EspGetCO = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const user = await UserModel.findOne({ deviceId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const espData = await EspModel.find({ esp: deviceId }).sort({ createdAt: 1 });
    const temperatureData = espData.map(data => ({
      temperature: parseFloat(data.mq2),
      timestamp: data.createdAt,
    }));

    res.json(temperatureData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const EspGetDang = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const user = await UserModel.findOne({ deviceId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const espData = await EspModel.find({ esp: deviceId }).sort({ createdAt: 1 });
    const temperatureData = espData.map(data => ({
      temperature: parseFloat(data.mq5)
    }));

    res.json(temperatureData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
