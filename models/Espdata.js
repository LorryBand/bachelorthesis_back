import mongoose from "mongoose";

const EspSchema = new mongoose.Schema(
  {
    esp: {
      type: String,
    },
    mq2: {
      type: String,
    },
    mq5: {
      type: String,
    },
    humidity: {
      type: String,
    },
    temperature: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Espdata", EspSchema);
