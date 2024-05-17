import mongoose from "mongoose"

const toppingSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
})

export const ToppingModel = mongoose.model("Topping", toppingSchema)
