/**
 * setupPlanSheetApi_V1.js
 *
 * Define all the PlanSheet api here
 *
 */

const mongoose = require('mongoose');
const Project = require('./models/project');
const PlanSheet = require('./models/planSheet');
const Scene = require('./models/scene');

module.exports = (router) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/shootingstudio');

  router.get('/initProject', (req, res) => {
    const project = new Project();
    project.name = 'My First Project';

    const planSheet = new PlanSheet();

    // define all the actors
    const actorXiaoMei = { _id: 0, id: mongoose.Types.ObjectId(), name: 'Xiaomei' }; // eslint-disable-line new-cap
    const actorDachui = { _id: 0, id: mongoose.Types.ObjectId(), name: '大锤' }; // eslint-disable-line new-cap
    const actorFeiHong = { _id: 0, id: mongoose.Types.ObjectId(), name: '黄飞鸿' }; // eslint-disable-line new-cap
    const actorShige = { _id: 0, id: mongoose.Types.ObjectId(), name: '诗歌' }; // eslint-disable-line new-cap

    // define all the stages
    const stageChurch = { id: mongoose.Types.ObjectId(), name: 'Church' }; // eslint-disable-line new-cap
    const stageHome = { id: mongoose.Types.ObjectId(), name: 'Home' }; // eslint-disable-line new-cap
    const stageOffice = { id: mongoose.Types.ObjectId(), name: '办公室' }; // eslint-disable-line new-cap

    let scene = new Scene();
    scene.seq = 1;
    scene.stage = stageChurch;
    scene.environment = 1;
    scene.actors.push(actorXiaoMei);
    scene.actors.push(actorDachui);
    planSheet.scenes.push(scene);

    scene = new Scene();
    scene.seq = 2;
    scene.stage = stageHome;
    scene.environment = 2;
    scene.actors.push(actorXiaoMei);
    planSheet.scenes.push(scene);

    scene = new Scene();
    scene.seq = 3;
    scene.stage = stageHome;
    scene.environment = 1;
    scene.actors.push(actorFeiHong);
    scene.actors.push(actorShige);
    scene.actors.push(actorXiaoMei);
    planSheet.scenes.push(scene);

    scene = new Scene();
    scene.seq = 4;
    scene.stage = stageOffice;
    scene.environment = 1;
    scene.actors.push(actorFeiHong);
    scene.actors.push(actorShige);
    scene.actors.push(actorDachui);
    planSheet.scenes.push(scene);

    project.planSheets.push(planSheet);

    project.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Project added to the locker!', data: project });
    });
  });

  router.get('/clearProject', (req, res) => {
    Project.remove({}, (err) => {
      if (err) { res.send(err); }
      res.json({ message: 'project is cleared.' });
    });
  });

  router.get('/projects', (req, res) => {
    Project.find((err, projects) => { // eslint-disable-line array-callback-return
      if (err) {
        res.send(err);
      }

      let allProjects = { message: 'no project found.' };
      if (projects.length > 0) {
        allProjects = projects;
      }

      res.json(allProjects);
    });
  });

  router.get('/project', (req, res) => {
    // currently, there is only one entry in the Project collection
    Project.findOne((err, project) => {
      if (err) {
        res.send(err);
      }

      if (project) {
        res.json(project);
      } else {
        res.json({ message: 'no project found' });
      }
    });
  });

  router.get('/plansheet', (req, res) => {
    // currently, there is only one entry in the Project collection
    const query = Project.findOne();
    query.select({ planSheets: { $slice: 1 } });

    query.exec((err, project) => {
      if (err) {
        res.send(err);
      }

      let selectedPlanSheet = { message: 'no planSheet found' };
      if (project && project.planSheets.length > 0) {
        selectedPlanSheet = project.planSheets[0];
      }

      res.json(selectedPlanSheet);
    });
  });
};
