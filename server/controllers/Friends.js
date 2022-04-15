// const models = require('../models');
const FriendModel = require('../models/Friends');

// const { Friend } = models;

const friendPage = (req, res) => res.render('app');

/* const makeDomo = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const friendData = {
    name: req.body.name,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age, fruit: newDomo.fruit });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
}; */

const getFriends = (req, res) => FriendModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }

  return res.json({ friends: docs });
});

const domoFace = (req, res) => res.render('domoFace');

module.exports = {
  friendPage,
  // makeDomo,
  getFriends,
  domoFace,
};
