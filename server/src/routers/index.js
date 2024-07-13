const homeRouter = require('./home');
const authRouter = require('./auth');
const noteRouter = require('./note');
const userRouter = require('./user');

const routers = (app) => {
    app.use('/auth', authRouter);
    app.use('/note', noteRouter);
    app.use('/user', userRouter);
    app.use('/', homeRouter);
};

module.exports = routers;
