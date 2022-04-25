const models = require('../models');
const FriendModel = require('../models/Friends');
const AccountModel = require('../models/Account');

const { Friend } = models;

const friendPage = (req, res) => res.render('app');

const addFriend = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const friendData = {
    name: req.body.name,
    owner: req.session.account._id,
  };

  try {
    const newFriend = new Friend(friendData);
    await newFriend.save();
    return res.status(201).json({ name: newFriend.name });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Person is already your friend!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

const getFriends = (req, res) => FriendModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }

  return res.json({ friends: docs });
});

const fundsPage = (req, res) => res.render('fundsPage');

const addFunds = async (req, res) => {
  const amount = `${req.body.amount}`;

  if (!amount || amount < 0) {
    return res.status(400).json({ error: 'Enter Valid Amount!' });
  }

  try {
    const doc = await AccountModel.findOne(req.session.account).exec();
    const newBalance = doc.balance + amount;
    return res.status(201).json({ balance: newBalance });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured' });
  }
};

module.exports = {
  friendPage,
  addFriend,
  getFriends,
  fundsPage,
  addFunds,
};
