/**
 * setupPlanSheetApi.js
 *
 * Define all the PlanSheet api here
 *
 */

const monk = require('monk');
const db = monk('localhost:27017/shootingstudio');

module.exports = (router) => {
  router.get('/initPlanSheet', (req, res) => {
    const scenes = [{
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

    const collection = db.get('scenesCollection');

    collection.drop(() => {
      collection.insert(scenes);
      res.json({ message: 'you hit the api' });
    });
  });

  router.get('/plansheetdb', (req, res) => {
    const collection = db.get('scenesCollection');
    collection.find({}, '-_id', (e, scenes) => {
      res.json(scenes);
    });
  });
};
