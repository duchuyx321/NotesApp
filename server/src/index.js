const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cors = require('cors');
const handlebars = require('express-handlebars').engine;
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./util/passport');

const routers = require('./routers');
const db = require('./config/db/mongodb');
const createIndex = require('./app/middleware/CreateIndex');

const app = express();

// cors
app.use(
    cors({
        origin: process.env.URL_CLIENT, // Chỉ định origin của client
        credentials: true, // Cho phép gửi cookie giữa các domain khác nhau
    }),
);

// method-Override
app.use(methodOverride('_method'));

// morgan
app.use(morgan('combined'));

// static
app.use(express.static(path.join(__dirname, 'public')));

// cookies
app.use(cookieParser());
// post data
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// connect database
db();
// routers
routers(app);

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            isCookie: (req, res) => {
                !!(res.cookie && res.cookie.refreshToken);
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});
