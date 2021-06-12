require("dotenv").config();

const { connect } = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wqup4.mongodb.net/freecodecamp?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongodb connected...");
});

const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [{ type: String }],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "Alvin",
    age: 34,
    favoriteFoods: ["pasta", "calderata", "kare-kare"],
  });
  person.save((err, data) => {
    if (err) done(err, null);
    console.log("person was successfully saved.");
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      done(err, data);
    } else {
      done(null, data);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    done(err, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    done(err, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, data) => {
    if (!err) {
      data.favoriteFoods.push(foodToAdd);
      data.save(done);
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true },
    done
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, done);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => done(err, data));
};

removeManyPeople((err, data) => console.log(err, data));

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
