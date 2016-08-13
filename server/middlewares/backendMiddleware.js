/* eslint-disable global-require */
const express = require('express');
const bodyParser = require('body-parser');
const setupPlanSheetApi = require('../backend/setupPlanSheetApi');
const setupPlanSheetApiV1 = require('../backend/setupPlanSheetApi_V1');

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

setupPlanSheetApi(router);
setupPlanSheetApiV1(router);

module.exports = router;
