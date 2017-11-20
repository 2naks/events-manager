import UserController from '../../controllers/user-controller.js';


const routes = (app) => {
  /*
	 *GET API index route
	 */
  app.route('/api/v1')
	  .get((req, res) => res.send({ title: 'Welcome to Events Manager' }));
  
  app.route('/api/v1/users')
    .post(UserController.signUp);
};

export default routes;