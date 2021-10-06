# serverless-websites
Make your own website with Zoho Catalyst

This is an AdvancedIO program written in Catalyst.


So the thought flow is like this . It is important to have a clear flow of thoughts so read up first.

We are going to make a website using Catalyst.
A website will have a client that you can see on your mobile or laptop.
A website will have a server that will get you specific news that you want to get and show on the client.
Quite Simple.


Now what you need to do to get this done in Catalyst?

The index.html is what gets shown to folks. 
The index.html works in concert with main.js and main.css. 

The heroine of the entire program is ------------------ main.js .

The main.js acts as a bridge between the client (index.html) and the server (index.js) files.
Remember, as we are coding in nodejs we are using javascript across the server and the client. So be mindful of this as you may find that - odd.

So what really happens in this program?
When the index.html page loads, it calls an onload function - getCatNews_Stream . 
You will find the implementation of this function in the main.js file.
So when you look that up, you find that the following is being invoked in the main.js file.
Look at line 34 carefully.
That is the point when the server (index.js) gets invoked and subsequently when the response comes back, it is 
replaced in the news_stream div in the client. Simple.

```
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


```

Now let us look into the index.js file where we have the implementation of the getCatNews_Stream method.

```
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


```

So what is happening here ? 
We are making a HTTP GET using the request package (this package has been downgraded so consider using fetch or axios or SuperAgent or some other package) to the cat api provider. And the results are send back to the main.js file that invoked it .. remember line 34 above.

That is about it folks.

Now what is the big deal about this? Nothing. Exactly.

You just built yourself a website hosted in Catalyst.

Just a few queries before you drop off though -
1. Did you rent any servers?
2. Did you install any database?
3. Did you need to buy any domain?
4. Did you have to pay any money to signup to Catalyst?
5. Did you need to get Admin passwords to access the database or anything?

If the answer is no, then you have just built yourself a serverless website my friend. Congrats!
