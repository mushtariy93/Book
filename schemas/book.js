const { strict } = require("assert");
const { Schema, model } = require("mongoose");
const { stringify } = require("querystring");
const { runInContext } = require("vm");

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true, min: [50, "Kitob sahifasi minimum 50 sahifa bo'lishi kerak"], max: [900, "Kitob sahifasi 900 betdan oshmasligi kerak"]},
  price: { type: Number, required: true },
  publish_date: { type: Date, required: false },
  publisher_id: { type: Number, required: false },
  type_id: { type: Number, required: false, enum: {values: ["roman", "qissa", "hikoya"], message: `{value} noto'g'ri`}},
},

{
    versionKey: false,
    timestamps: true,
    toJSON: {getters: true}
}

);
bookSchema.statics.findByName = function(name) {
        return this.find({
            name: new RegExp(name, "i")
        })
}

bookSchema.query.byName = function(name) {
    return this.where({name: new RegExp(name, "i")})
    }

bookSchema.set("validateBeforeSave", false)

module.exports = model("Book", bookSchema)