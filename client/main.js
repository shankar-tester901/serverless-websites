function getWeather() {
  $("#weather_detail").html(
    '<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>'
  );

  $.ajax({
    type: "POST",
    url: "/server/weather_serverless/getWeather",
    contentType: "application/json",
    data: JSON.stringify({
      "city": $('#city').val()
    }),
    success: function (data) {
      $("#weather_detail").html(data);
    },
    error: function (error) {
      alert(error);
    }
  });
}


function getAppleNews() {
  $("#news_detail").html(
    '<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>'
  );

  $.ajax({
    type: "GET",
    url: "/server/weather_serverless/getAppleNews",
    contentType: "application/json",
    success: function (data) {

      $("#newsDetails").html(data);
    },
    error: function (error) {
      alert('Error' + error);
    }
  });
}


function getNews_Stream() {
  $("#news_detail").html(
    '<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>'
  );

  $.ajax({
    type: "GET",
    url: "/server/weather_serverless/getNews_Stream",
    contentType: "application/json",
    success: function (data) {

      $("#news_stream").html(data);
    },
    error: function (error) {
      alert('Error' + error);
    }
  });
}


function getCatNews_Stream() {

  $("#news_stream").html(
    '<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>'
  );

  $.ajax({
    type: "GET",
    url: "/server/weather_serverless/getCatNews_Stream",
    contentType: "application/json",
    success: function (data) {

      $("#news_stream").html(data);
    },
    error: function (error) {
      alert('Error' + error);
    }
  });
}
