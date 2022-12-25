const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {

//   constructor(id, title, price, imageUrl, description, userId) {

//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.userId = userId;
//   };

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db.collection("products").updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }

//     return dbOp.then(result => {
//     }).catch(err => {
//       console.log(err);
//     });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection("products").find().toArray().then(result => {
//       return result;
//     }).catch(err => {
//       console.log(err);
//     })
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db.collection("products").find({ _id: new mongodb.ObjectId(prodId) }).next().then(result => {
//       console.log(result);
//       return result;
//     }).catch(err => {
//       console.log(err);
//     })
//   }

//   static deleteById(prodId) {
//     const db = getDb();

//     return db.collection("products").deleteOne({ _id: new mongodb.ObjectId(prodId) }).then(result => {
//       console.log(result);
//       return result;
//     }).catch(err => {
//       console.log(err);
//     })
//   }

// }

// module.exports = Product;
