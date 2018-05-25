var express = require('express');
var router = express.Router();

//Periods: 1: 8-10 2: 10-12, 3: 12-14, 4: 14-16, 5: 16-18, 6: 18-20, 7: 20-22, 8: 22-24
//Categories: {id: 1, title: 'Zakupy'},
//{id: 2, title: 'Nauka'},
//{id: 3, title: 'Odpoczynek'}
var events = [
    {id: 1, title: 'Zrobic zakupy spozywcze', category: 1, date: '05-21-2018', period: 1, person: 1},
    {id: 2, title: 'Pojsc do kina', category: 3, date: '05-11-2018', period: 3, person: 1},
    {id: 3, title: 'Odrobić lekcje', category: 2, date: '05-21-2018', period: 5, person: 1},
    {id: 4, title: 'Zrobić projekt z BSK', category: 1, date: '05-13-2018', period: 2, person: 2},
    {id: 5, title: 'Kupić nowe opony', category: 2, date: '05-14-2018', period: 6, person: 2},
    {id: 6, title: 'Pojechać nad wodę', category: 3, date: '05-13-2018', period: 5, person: 2}
];

module.exports = router;

router.get('/', function(req, res){
    res.json(events);
});

router.get('/:id', function (req, res) {
    var currEvent = events.filter(function (event) {
        if (event.id == req.params.id) {
            return true;
        }
    });
    if (currEvent.length === 1) {
        res.json(currEvent[0]);
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
});

router.get('/personsPlan/:id', function (req, res) {
    var currEvent = events.filter(function(event) {
        if (event.person.toString() === req.params.id) {
            return true;
        }
    });
    if (currEvent.length >= 1) {
        res.json(currEvent);
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
});

router.get('/dayPlan/:date', function (req, res) {
    var currEvent = events.filter(function (event) {
        if (event.date === req.params.date) {
            return true;
        }
    });
    if (currEvent.length >= 1) {
        res.json(currEvent);
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
});

router.get('/monthlyPlan/:month', function (req, res) {
    var currEvent = events.filter(function (event) {
        var formattedDate = new Date(event.date);
        var month = formattedDate.getMonth();
        if (month == req.params.month){
            return true;
        }
    });

    if (currEvent.length >= 1) {
        res.json(currEvent);
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
});

router.post('/', function (req, res) {
    if (!req.body.title || !req.body.category || !req.body.date || !req.body.person || !req.body.period) {
        res.status(400);
        res.json({message: "Bad Request posting"});
    } else {
        var newId = events[events.length-1].id+1;
        events.push({
            id: newId,
            title: req.body.title,
            category: parseInt(req.body.category),
            date: req.body.date,
            period: parseInt(req.body.period),
            person: parseInt(req.body.person),
        });
        res.json({message: "New event created.", location: "/events/" + newId});
    }
});

router.put('/:id', function (req, res) {
    if((!req.body.title || !req.body.category || !req.body.date || !req.body.period || !req.params.id.toString().match(/^[0-9]+$/g))) {
        res.status(400);
        res.json({message: "Bad Request put"});
    } else {
        var updateIndex = events.map(function (event) {
            return event.id;
        }).indexOf(parseInt(req.params.id));

        if (updateIndex === -1){
            return;
        } else {
            events[updateIndex].title= req.body.title;
            events[updateIndex].category = parseInt(req.body.category);
            events[updateIndex].date = req.body.date;
            events[updateIndex].period = parseInt(req.body.period);
            res.json({message: "Event id " + req.params.id + " updated.",
                location: "/events/" + req.params.id});
        }
    }
});

router.delete('/:id', function (req, res){
    var removeIndex = events.map(function (event){
        return event.id;
    }).indexOf(parseInt(req.params.id));

    if(removeIndex === -1){
        res.json({message: "Not found"});
    } else {
        events.splice(removeIndex, 1);
        res.send({message: "Event id " + req.params.id + " removed."});
    }
});

