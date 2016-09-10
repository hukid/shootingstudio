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
const Actor = require('./models/actor');
const Stage = require('./models/stage');

module.exports = (router) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/shootingstudio');

  router.get('/initProject', (req, res) => {
    const project = new Project();
    project.name = 'My First Project';

    const planSheet = new PlanSheet();

    // define all the actors
    const actorXiaoMei = new Actor({ name: 'Xiaomei' });
    const actorDachui = new Actor({ name: '大锤' });
    const actorFeiHong = new Actor({ name: '黄飞鸿' });
    const actorShige = new Actor({ name: '诗歌' });

    project.actors.push(actorXiaoMei);
    project.actors.push(actorDachui);
    project.actors.push(actorFeiHong);
    project.actors.push(actorShige);

    // define all the stages
    const stageChurch = new Stage({ name: 'Church' });
    const stageHome = new Stage({ name: 'Home' });
    const stageOffice = new Stage({ name: '办公室' });

    project.stages.push(stageChurch);
    project.stages.push(stageHome);
    project.stages.push(stageOffice);

    let scene = new Scene();
    scene.seq = 1;
    scene.stage_id = stageChurch._id; // eslint-disable-line no-underscore-dangle
    scene.environment = 1;
    scene.actors.push(actorXiaoMei._id); // eslint-disable-line no-underscore-dangle
    scene.actors.push(actorDachui._id); // eslint-disable-line no-underscore-dangle
    planSheet.scenes.push(scene);

    scene = new Scene();
    scene.seq = 2;
    scene.stage_id = stageHome._id; // eslint-disable-line no-underscore-dangle
    scene.environment = 2;
    scene.actors.push(actorXiaoMei._id); // eslint-disable-line no-underscore-dangle
    planSheet.scenes.push(scene);

    scene = new Scene();
    scene.seq = 3;
    scene.stage_id = stageHome._id; // eslint-disable-line no-underscore-dangle
    scene.environment = 1;
    scene.actors.push(actorFeiHong._id); // eslint-disable-line no-underscore-dangle
    scene.actors.push(actorShige._id); // eslint-disable-line no-underscore-dangle
    scene.actors.push(actorXiaoMei._id); // eslint-disable-line no-underscore-dangle
    planSheet.scenes.push(scene);

    scene = new Scene();
    scene.seq = 4;
    scene.stage_id = stageOffice._id; // eslint-disable-line no-underscore-dangle
    scene.environment = 1;
    scene.actors.push(actorFeiHong._id); // eslint-disable-line no-underscore-dangle
    scene.actors.push(actorShige._id); // eslint-disable-line no-underscore-dangle
    scene.actors.push(actorDachui._id); // eslint-disable-line no-underscore-dangle
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

  // Define the scene REST APIs
  const sceneRouter = router.route('/scene/:projectId/:planSheetId');

  sceneRouter.post((req, res) => {
    const projectId = req.params.projectId;
    const planSheetId = req.params.planSheetId;

    Project.findOne(
      { _id: projectId, 'planSheets._id': planSheetId },
      (err, project) => {
        if (err) {
          res.send(err);
        }

        let selectedPlanSheet = { message: 'no planSheet found' };
        if (project && project.planSheets.length > 0) {
          selectedPlanSheet = project.planSheets[0];
          const newActors = req.body.actors.split(';');
          const stageName = req.body.stage;
          const environment = req.body.environment;

          // Add the scene
          const scene = new Scene();
          scene.seq = selectedPlanSheet.scenes.length + 1;
          scene.environment = environment;

          // Set new actors
          const existingActors = project.actors;
          const existingActorsLength = existingActors.length;
          for (let newActorIndex = 0; newActorIndex < newActors.length; newActorIndex++) {
            const newActorName = newActors[newActorIndex];
            let existingActorIndex = 0;
            for (; existingActorIndex < existingActorsLength; existingActorIndex++) {
              const existingActorName = existingActors[existingActorIndex].name;
              if (newActorName === existingActorName) {
                scene.actors.push(existingActors[existingActorIndex]._id); // eslint-disable-line no-underscore-dangle
                break;
              }
            }

            if (existingActorIndex === existingActorsLength) {
              const newActor = new Actor({ name: newActorName });
              existingActors.push(newActor);
              scene.actors.push(newActor._id); // eslint-disable-line no-underscore-dangle
            }
          }

          // Set new stage
          const existingStages = project.stages;
          const existingStagesLength = existingStages.length;
          let existingStageIndex = 0;
          for (; existingStageIndex < existingStagesLength; existingStageIndex++) {
            const existingStageName = existingStages[existingStageIndex].name;
            if (stageName === existingStageName) {
              scene.stage_id = existingStages[existingStageIndex]._id; // eslint-disable-line no-underscore-dangle
              break;
            }
          }

          if (existingStageIndex === existingStagesLength) {
            const newStage = new Stage({ name: stageName });
            existingStages.push(newStage);
            scene.stage_id = newStage._id; // eslint-disable-line no-underscore-dangle
          }

          selectedPlanSheet.scenes.push(scene);

          project.save((saveErr) => {
            if (saveErr) {
              res.send(saveErr);
            }

            res.json(project);
          });
        } else {
          res.json({ message: 'no project found' });
        }
      });
  });
};
