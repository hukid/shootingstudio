/* eslint-disable global-require */
const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/shootingstudio');

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // eslint-disable-line new-cap , get an instance of the express Router

// configure app to use bodyParser()
// this will let us get the data from a POST
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.json({ message: 'you hit the api' });
});

router.get('/initPlanSheet', (req, res) => {
  let scenes = [{
    seq: 1,
    stage: 'Church',
    environment: 'day',
    actors: [
      { name: 'Xiaomei' },
      { name: 'Dachui' },
    ],
  }, {
    seq: 2,
    stage: 'Home',
    environment: 'night',
    actors: [
      { name: 'Xiaomei' },
    ],
  }, {
    seq: 3,
    stage: 'Home',
    environment: 'day',
    actors: [
      { name: 'Fei Hong' },
    ],
  }, {
    seq: 4,
    stage: 'Office',
    environment: 'day',
    actors: [
      { name: 'Xiaomei' },
    ],
  },
  ];

  let collection = db.get('scenesCollection');

  collection.drop(() => {
    collection.insert(scenes);
    res.json({ message: 'you hit the api' });
  })
});

router.get('/plansheetdb', (req, res) => {
  let collection = db.get('scenesCollection');
  collection.find({}, '-_id', function(e,scenes){
        res.json(scenes);
  });
});

router.get('/plansheet', (req, res) => {
  res.json([{
    seq: 1,
    stage: 'Church',
    environment: 'day',
    actors: [
      { name: 'Xiaomei' },
      { name: 'Dachui' },
    ],
  }, {
    seq: 2,
    stage: 'Home',
    environment: 'night',
    actors: [
      { name: 'Xiaomei' },
    ],
  }, {
    seq: 3,
    stage: 'Home',
    environment: 'day',
    actors: [
      { name: 'Fei Hong' },
    ],
  }, {
    seq: 4,
    stage: 'Office',
    environment: 'day',
    actors: [
      { name: 'Xiaomei' },
    ],
  },
  ]);
});

module.exports = router;
