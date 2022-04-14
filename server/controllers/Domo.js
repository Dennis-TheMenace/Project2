const models = require('../models');
const DomoModel = require('../models/Domo');

const { Domo } = models;

const makerPage = (req, res) => res.render('app');

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.fruit) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    fruit: req.body.fruit,
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
};

const getDomos = (req, res) => DomoModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }

  return res.json({ domos: docs });
});

const domoFace = (req, res) => res.render('domoFace');

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
  domoFace,
};
