const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const app = express();


const NewsAPI = require('newsapi');
//get your own key folks
const apiKey = 'abcde8922';

//get your own key folks
const catApiKey = 'meow-meow-meow';



app.use(express.json());

app.post('/getWeather', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  // console.log(url);

  request(url, function (err, response, body) {
    if (err) {
      res.send('Error here. Please try again');
      console.log(err);
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.send('Error as main body is undefined');
      } else {
        let weatherText = `Temperature is a nice ${weather.main.temp} degrees in ${weather.name}!`;
        res.send(weatherText);
      }
    }

  });
})




app.get('/getAppleNews', function (req, res) {

  console.log('in get apple news ');
  //get your own key folks
  const newsapi = new NewsAPI('xyz33');

  newsapi.v2.topHeadlines({
    language: 'en'

  }).then(response => {
    console.log(response);

    var dataRow = '';
    for (var i = 0; i < response.articles.length; i++) {
      var a_article = response.articles[i];
      // console.log('Name - ' + a_article.name);
      dataRow = dataRow + ' <tr> <th scope="row"></th><tr><td>' + a_article.url + '</td><td>' + a_article.title + '</td><td>' + a_article.content + '</td></tr>';
    }


    res.send(
      '<table class="table" width="100%" ><thead class="thead-light"><tr><th scope="col">URL</th><th scope="col">Title</th><th scope="col">Content</th></tr></thead><tbody>' +
      dataRow +
      '</table>'
    );

  });
})



app.get('/getCatNews_Stream', function (req, res) {
  var sendData = '';
  //console.log(' in cat news ');
  var options = {
    method: 'GET',
    url: 'https://api.thecatapi.com/v1/images/search?limit=5&page=10',
    headers: { 'x-api-key': catApiKey }
  };


  request(options, function (err, response, body) {
    if (err) {
      res.send('Error here. Please try again');
      console.log(err);
    } else {
      // console.log(body);

      var tempBody = JSON.parse(body);
      for (var i = 0; i < 4; i++) {
        // console.log(tempBody[i].url);
        var show_image = tempBody[i].url;
        var img_send = "<img src='" + show_image + "' style=width:250px;height:250px; </img>";
        sendData = sendData + img_send;
      }

      res.send(sendData);

    }

  });




})
module.exports = app;
