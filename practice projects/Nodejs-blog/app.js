require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const MongoStoreImport = require('connect-mongo');
const session = require('express-session');
const {isActiveRoute} = require('./helpers/routerHelpers');

const app = express();
const port = process.env.PORT || 3000;

// connect DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.locals.isActiveRoute = isActiveRoute;

// handle both CJS/ESM shapes of connect-mongo and older API variations
const MongoStore = MongoStoreImport && (MongoStoreImport.default || MongoStoreImport);

const storeInstance = (MongoStore && typeof MongoStore.create === 'function')
    ? MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
    : (typeof MongoStore === 'function'
        ? new MongoStore({ url: process.env.MONGODB_URI })
        : null);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: storeInstance
}))

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout', './layout/main');


app.use('/', require('./router/main'));
app.use('/', require('./router/admin'));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})