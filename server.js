/**
 * requirement modules for server.js
 */
const express = require("express");
const ejs = require("ejs");
require("dotenv").config();
const app = express();
const pythonShell = require("python-shell");
const fs = require('fs');
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
app.use(express.static( "public" ));

/**
 * API routes & template URL
 */
app.get('/', function(request,response){
    response.render('template/image.ejs')
})

app.post('/test', async function(req,res){
    await fs.writeFile('./clothes_seperation_prediction/test.png',req.body.img, 'base64',function(err,data){
        if(err){console.log(err)}
    })

    let options = {
        pythonOptions: ['-u'],
        args: ['test.png'] //should be image name
    }

    console.log("prediction executued!!!!!!");
    try {
      pythonShell.PythonShell.run("./clothes_seperation_prediction/run.py", options, function(err,results){
              if(err){
                  console.log("python file execution error : " + err);
                  res.json({'result':'fail'});
                  throw err;
              }
              else{
                res.json({'result':'success'});
                return;
              }
          })
    } catch (error) {
      console.log("python shell execution error : " + error);
      throw error;
    }
})


/**
 * server start with PORT (default= 3000)
 */
app.listen(PORT, function(){
    console.log("ScreenAI backend Server is Listening on http://localhost:"+PORT);
})