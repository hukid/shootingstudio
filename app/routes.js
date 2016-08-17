// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
// import { getHooks } from 'utils/hooks';
import { getHooks } from './utils/hooks';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getHooks factory
  const { injectSagas } = getHooks(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
          System.import('containers/HomePage/sagas'),
          System.import('containers/PlanSheet/sagas'),
          // System.import('containers/SceneComposeForm/reducer'),
          // System.import('containers/SceneComposeForm/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component, homePageSagas/* planSheetSagas, sceneComposeReducer, sceneComposeSagas */]) => {
          // planSheet has to be exactly same as defined in PlanSheet/reducer
          injectSagas(homePageSagas.default);

          // injectSagas(planSheetSagas.default);

          // injectReducer('sceneCopmose', sceneComposeReducer.default);
          // injectSagas(sceneComposeSagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
