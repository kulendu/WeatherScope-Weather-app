// jshint esversion:6 

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
 
app.use(express.static("resources"));  
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/current_weather",function(req,res){
    const query = req.body.cityName;
    const apiKey = "d467e70166c7652359ccaf2316f31bb2";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp; 
            const temp_min = weatherData.main.temp_min;
            const temp_max = weatherData.main.temp_max;
            const description = weatherData.weather[0].description; 
           
           
            res.render("current_weather",{city:query, weather:temp, max_temp:temp_max, min_temp:temp_min, about:description});
            
        });
    });
});

app.post("/",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT|| 3000,function(){
    console.log("server is running at port 3000");
    
});