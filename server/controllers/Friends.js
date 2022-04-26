const models = require('../models');
const FriendModel = require('../models/Friends');
const AccountModel = require('../models/Account');

const { Friends } = models;

const friendPage = (req, res) => res.render('app');

const addFriend = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const name = await AccountModel.findOne({username: req.body.name}).exec();
    if(name)
    {
      const friendData = {
        name: req.body.name,
        owner: req.session.account._id,
      };

      const newFriend = new Friends(friendData);
      await newFriend.save();
      return res.status(201).json({ name: newFriend.name });
    }
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

const transferFunds = async (req, res) => {
  const amount = `${req.body.amount}`;

  if (!amount || amount < 0 || amount < balance) {
    return res.status(400).json({ error: 'Enter Valid Amount!' });
  }

  try {
    const doc = await AccountModel.findOne(req.session.account).exec();
    const newBalance = doc.balance - amount;
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
  addFunds,
  transferFunds,
};
