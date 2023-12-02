const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/mongodb')
const hbs = require('express-hbs');
const path = require('path');
const methodOverride = require('method-override')
app.engine('hbs', hbs.express4({
        defaultLayout: 'views/layouts/main', //Đây là tên của layout mặc định mà Handlebars sẽ sử dụng
        layoutsDir: path.join(__dirname, 'views/layouts'),  // đường dẫn đến layout templates
        partialsDir  : [
        //  path to your partials
        path.join(__dirname, 'views/partials'),   // là phần nhỏ đc sử dụng lại
    ]
    }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// const hbs = require('hbs');
require('dotenv').config();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

app.use('/home', tasks)
// app.get('/', (req, res) => {
//     res.render(index);
// })
//  get task
// create new a task
// get single task
// update single task
// delete task

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(3000, ()=> {
            console.log('listening on port 3000');
        })
    }
    catch (err) {
        console.log('Error messenger: ',err);
    }
}

start();