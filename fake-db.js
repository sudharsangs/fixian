const Store = require("./models/Store");
const User = require("./models/User");
const Review = require("./models/Review");

const fakeDbData = require("./data.json");

class FakeDb {
  constructor() {
    this.users = fakeDbData.users;
    this.usersDocs = [];
    this.stores = fakeDbData.stores;
    this.reviews = fakeDbData.reviews;
  }
  async cleanDb() {
    await User.remove({});
    await Store.remove({});
    await Review.remove({});
    return "Finished";
  }
  pushDataToDb() {
    this.users.forEach(user => {
      const newUser = new User(user);
      this.usersDocs.push(newUser);
      newUser.save();
    });

    this.stores.forEach(store => {
      const newStore = new Store(store);
      newStore.author = this.usersDocs[
        Math.floor(Math.random() * Math.floor(this.usersDocs.length))
      ];
      newStore.save();
    });

    this.reviews.forEach(review => {
      const newReview = new Review(review);
      newReview.save();
    });
  }
  seedDb() {
    this.cleanDb().then(() => {
      this.pushDataToDb();
    });
  }
}

module.exports = FakeDb;
