const mongoose = require('mongoose');
const _ = require('underscore');

let FriendModel = {};

const setName = (name) => _.escape(name).trim();

const FriendSchema = new mongoose.Schema({
  name:
    {
      type: String,
      required: true,
      trim: true,
      set: setName,
    },
  balance:
    {
      type: Number,
      required: true,
      default: 100,
    },
  createdDate:
    {
      type: Date,
      default: Date.now,
    },
});

FriendSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  fruit: doc.fruit,
});

FriendSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return FriendSchema.find(search).select('name').lean().exec(callback);
};

FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
