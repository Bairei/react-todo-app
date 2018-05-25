var express = require('express');
var router = express.Router();

var students = [
    {id: 1, firstName: "Ala", lastName: 'Makota'},
    {id: 2, firstName: "Stefan", lastName: 'Kowalski'},
    {id: 3, firstName: "Basia", lastName: 'Stanislawowska'},
    {id: 4, firstName: "Wiesław", lastName: 'Dobrzycki'}
];

module.exports = router;

router.get('/', function (req, res) {
    res.json(students);
});

router.get('/:id', function (req, res) {
    var currStudent = students.filter(function (stud) {
        if (stud.id == req.params.id) {
            return true;
        }
    });
    if (currStudent.length == 1) {
        res.json(currStudent[0]);
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
});

router.post('/', function (req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.age) {
        res.status(400);
        res.json({message: "Bad Request posting"});
    } else {
        var newId = students[students.length - 1].id + 1;
        students.push({
            id: newId,
            firstName: req.body.firstname,
            lastName: req.body.firstname,
            age: req.body.age
        });
        res.json({message: "New student created.", location: "/students/" + newId});
    }
});

router.put('/:id', function (req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.age || !req.params.id.toString().match(/^[0-9]+$/g)) {
        res.status(400);
        res.json({message: "Bad Request put"});
    } else {
        var updateIndex = students.map(function (student) {
            return student.id;
        }).indexOf(parseInt(req.params.id));

        if (updateIndex === -1) {
            return;
        } else {
            students[updateIndex].firstName = req.body.firstName;
            students[updateIndex].lastName = req.body.lastName;
            students[updateIndex].age = req.body.age;
            res.json({
                message: "Student id " + req.params.id + " updated.",
                location: "/students/" + req.params.id
            });
        }
    }
});

router.delete('/:id', function (req, res) {
    var removeIndex = students.map(function (student) {
        return student.id;
    }).indexOf(parseInt(req.params.id));

    if (removeIndex === -1) {
        res.json({message: "Not found"});
    } else {
        students.splice(removeIndex, 1);
        res.send({message: "Student id " + req.params.id + " removed."});
    }
});

