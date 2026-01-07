
const User = require('../models/user');

insertUsers = function (req, res, next) {
    const user = new User({
    userName: req.body.userName,
    userMail: req.body.userMail
    });

    user.save()
    .then(savedUser => {
        console.log(savedUser.userName);
        res.redirect('/getusers');
    })
    .catch(err => {
        console.log(err);
        res.redirect('/');
    });
}

getUsers = function(req, res, next) {
    User.find({})
    .then(users => {
        console.log(users);
        res.render('index', { users: users });
      // res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        res.redirect('/');
    });
}

updateUsers = function (req, res, next) {
    const ID = req.body.id;
    const updatedUser = {
        userName: req.body.userName,
        userMail: req.body.userMail
    }
    User.updateOne({ _id: ID }, { $set: updatedUser })
        .then((doc) => {
            console.log(doc);
            res.redirect('/getusers');
        }).catch((err => {
            console.log(err);
            res.redirect('/');
            return;
        }))
}


deleteUsers = function (req, res, next) {
    const ID = req.body.id;
    User.deleteOne({ id: ID }).then((doc) => {
        console.log(doc);
        res.redirect('/getusers');
    }).catch((err) => {
        console.log(err);
        res.redirect('/');
    })
}

module.exports = {
    insertUsers : insertUsers, 
    getUsers    : getUsers,
    updateUsers : updateUsers,
    deleteUsers : deleteUsers,
}