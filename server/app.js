const express = require("express")
const apiRoutes = require('./routes/api')
const webRoutes = require('./routes/web')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')
const path = require('path');
const app = express();
const aipRouter = express.Router();
const webRouter = express.Router();
let TaskManagement = require('./schedules/schedule-management');
// connect database
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/SSA"
/** configure cloudinary */
cloudinary.config({
    cloud_name: 'YOUR_CLOUDINARY_NAME_HERE',
    api_key: 'YOUR_CLOUDINARY_API_KEY_HERE',
    api_secret: 'YOUR_CLOUDINARY_API_SECRET_HERE'
})
let taskManagement = TaskManagement()
/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        useMongoClient: true
    },() => {
        taskManagement.start();
    })    
} catch (error) {
    }
let port = 5000 || process.env.PORT
/** set up routes {API Endpoints} */
apiRoutes(aipRouter)
/** set up routes {Web Endpoints} */
webRoutes(webRouter)
/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.use('/static',express.static(path.join('./build/static')))
app.use('/api', aipRouter)
app.use('/', webRouter);

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});