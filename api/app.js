//gets maximal avaiable daily data from SWX for given ISIN code (most of the time goes back to 1998)

var express = require('express');
var fetch = require('node-fetch');
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/isin/:ISIN/:DENOMINATION', function (req, res) {

  if(res.req.params){
    var url = "http://www.six-swiss-exchange.com/itf/fqs/delayed/charts.json?select=ISIN,ClosingPrice,ClosingPerformance,PreviousClosingPrice&where=ValorId=" + res.req.params.ISIN + res.req.params.DENOMINATION + "4&columns=Date,Time,Close,Open,Low,High,TotalVolume&fromdate=19880630&netting=1440&clientApp=getDailyHLO"

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        } else {
          return response.json()
        }
      })
      .then(json => {
        res.send(json);
      })
  }

});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
