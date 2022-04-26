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
  createdDate:
    {
      type: Date,
      default: Date.now,
    },
});

FriendSchema.statics.toAPI = (doc) => ({
  name: doc.name,
});

FriendSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return FriendModel.find(search).select('name').lean().exec(callback);
};

FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
