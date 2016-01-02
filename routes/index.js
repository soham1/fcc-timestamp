var express = require('express');
var router = express.Router();

//Epoch: Math.round(new Date(input).getTime()/1000.0)
//Normal Time var formattedDate = date.getUTCDate() + '-' + (date.getUTCMonth() + 1)+ '-' + date.getUTCFullYear()
function getMonthName (num){
    var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  return monthNames[num];
}

router.get('/', function(req, res) {
  res.render('index', { title: 'FCC Timestamp Microservice' });
});
router.get('/:id', function(req, res) {
    var input = req.params.id;
    if(!isNaN(input)){
        var date = new Date(Number(input));
        var monthNum = date.getMonth();
        var monthName = getMonthName(monthNum);
        var fullDate = monthName + " " + date.getDay() + ", " + date.getFullYear();
        var jsonObj1 = {'unix': input, 'natural': fullDate};
        res.json(jsonObj1);
    }else if(!isNaN(Date.parse(input))){
        var epoch = Math.round(new Date(input).getTime()/1000.0);
        var jsonObj2 = {'unix': epoch, 'natural': input};
        res.json(jsonObj2);
    }else{
        res.json({'unix': null, 'natural': null});
    }
});

module.exports = router;
