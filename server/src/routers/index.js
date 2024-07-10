const homeRouter = require('./home');
const authRouter = require('./auth');
const noteRouter = require('./note');

const routers = (app) => {
    app.use('/auth', authRouter);
    app.use('/note', noteRouter);
    app.use('/', homeRouter);
};

module.exports = routers;
