const homeRouter = require('./home');
const authRouter = require('./auth');
const noteRouter = require('./note');
const userRouter = require('./user');
const otherRouter = require('./other');
const codeRouter = require('./code');
const adminRouter = require('./admin');

const routers = (app) => {
    app.use('/api/auth', otherRouter);
    app.use('/code', codeRouter);
    app.use('/auth', authRouter);
    app.use('/note', noteRouter);
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/', homeRouter);
};

module.exports = routers;
