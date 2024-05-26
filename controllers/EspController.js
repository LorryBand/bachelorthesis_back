import EspModel from "../models/Espdata.js";

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
