const nextRoutes = require('next-routes');
const router = (module.exports = nextRoutes());
const routes = require('./constants/Routes').routes;
routes.forEach(route => { router.add(route.page, route.route); });