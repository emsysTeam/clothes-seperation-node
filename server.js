/**
 * requirement modules for server.js
 */
const express = require("express");
const ejs = require("ejs");
require("dotenv").config();
const app = express();
const pythonShell = require("python-shell");

/**
 * requirement variables for server.js
 */
const PORT = process.env.PORT || 3000;

/**
 * express app setting options
 */
app.use(express.json({
    limit : "50mb"
}));
app.use(require("body-parser").urlencoded({extended:true}));
app.set('view engines', ejs);
app.set('views', __dirname, + './views');

app.get('/', function(request,response){
    response.render('template/image.ejs', {title:"image", clickHanlder: "image"})
})




/**
 * server start with PORT (default= 3000)
 */
app.listen(PORT, function(){
    console.log("ScreenAI backend Server is Listening on http://localhost:"+PORT);
})