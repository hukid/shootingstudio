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
  mongoose.connect('mongodb://localhost:27017/shootingstudio');

  router.get('/initProject', (req, res) => {
    const project = new Project();
    project.name = 'My First Project';

    const planSheet = new PlanSheet();

    // define all the actors
    const actorXiaoMei = { id: mongoose.Types.ObjectId(), name: 'Xiaomei' };
    const actorDachui = { id: mongoose.Types.ObjectId(), name: '大锤' };
    const actorFeiHong = { id: mongoose.Types.ObjectId(), name: '黄飞鸿' };
    const actorShige = { id: mongoose.Types.ObjectId(), name: '诗歌' };

    // define all the stages
    const stageChurch = { id: mongoose.Types.ObjectId(), name: 'Church' };
    const stageHome = { id: mongoose.Types.ObjectId(), name: 'Home' };
    const stageOffice = { id: mongoose.Types.ObjectId(), name: '办公室' };

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

    project.planSheet.push(planSheet);

    project.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Project added to the locker!', data: project });
    })
  });

  router.get('/project', (req, res) => {
    Project.find((err, projects) => {
      if (err) {
        res.send(err);
      }

      let selectedProject = { message: 'no project found.'};
      if (projects.length > 0)
      {
         selectedProject = projects[0];
      }
      res.json(selectedProject);
    })
  });

  router.get('/plansheetdbV1', (req, res) => {
    // currently, there is only one entry in the Project collection
    let query = Project.findOne();
    query.select('planSheet');

    query.exec((err, project) => {
      if (err) {
        res.send(err);
      }

      let selectedPlanSheet = { message: 'no planSheet found' };
      if (project.planSheet.length > 0) {
        selectedPlanSheet = project.planSheet[0];
      }

      res.json(selectedPlanSheet);
    });
  });
};