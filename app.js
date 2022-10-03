const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 10,
  review: "Peaches are so yummy!"
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit."
});

mango.save();

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple
// });

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err) {
  if (err) {
    console.log(err);
  } else {
      console.log("Successfully updated the document.");
  }
});

// person.save();


Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id: "63176e2d40543f6d09e81248"}, {name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//       console.log("Successfully updated the document.");
//   }
// });

// Fruit.deleteOne({name: "Banana"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//       console.log("Successfully deleted the document.");
//   }
// });

// Person.deleteMany({name: "John"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//       console.log("Successfully deleted the document.");
//   }
// });
