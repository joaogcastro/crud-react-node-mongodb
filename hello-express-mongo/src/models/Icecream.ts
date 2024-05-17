import mongoose from "mongoose"

const icecreamSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  toppingId: {
    type: mongoose.Schema.Types.ObjectId, ref: "Topping"
  }
})

export const IcecreamModel = mongoose.model("Icecream", icecreamSchema)
