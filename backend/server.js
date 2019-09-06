let axios = require("axios");
let cheerio = require("cheerio");
let writtenNumber = require("written-number");
let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());

app.get('/damfund', function (req, res) {
  let funds = [];

  axios
    .get("http://scp.gov.pk/popup.aspx")
    .then(response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        //Get amount in number and words  
        funds.push($("#td5")[0].children[0].data);
        $("#td5")
          .find("span")
          .each((i, element) => {
            funds.push(
              $(element)
                .text()
                .replace(/[()]/g, "")
            ); //Grab contents of span
          });
                  
        let str = $("script:not([src])")[0].children[0].data;

        let dateLabels = JSON.parse("[" + str.match(/labels:\s\[([\s\S]*?)\]/)[1] + "]");
        let amountLabels = JSON.parse("[" + str.match(/[^//]data:\s\[([\s\S]*?)\]/)[1] + "]");
        let totalAmount = $('#divCauseList > table:nth-child(3) > tbody > tr:nth-child(9) > td:nth-child(3)').text().replace(/,/g,'');
        let totalAmountEng = writtenNumber(totalAmount);

        let data = [["Date","Amount"]];
        
      dateLabels.map((item,index) => {
          data.push(
            [item,
              amountLabels[index]]
          );
        });

        json = {
          totalAmount,
          totalAmountEng: toTitleCase(totalAmountEng),
          currentAmount: funds[0].replace(/\D/g,''),
          currrentAmountEng: toTitleCase(funds[1]),
          lastUpdatedOn: dateLabels[dateLabels.length-1],
          data, // Date and amount array
        };

        return res.send(json);
      }
    })
    .catch(error => {
      res.send(404).status(error);
    });
})

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


app.get('/', function (req, res) {
  return res.send("server is up and running");
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Server listening at http://%s:%s", host, port)
})

