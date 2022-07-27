const userService = require('../services/user.service')


module.exports = {
    authenticate,
    getAllUsers,
    register,
    setGoal,
    getGoal,
};


function authenticate(req, res, next) {
    console.log("Authenticate():", req.body);
       userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAllUsers(req, res, next) {
    //  console.log("getAll", req.body);
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function register(req, res, next) {

    userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

//push to front end
//TODO: get goals (calorie goal and minute goal) for the specific username in 'req.params...' and send the JSON back the to the user that requested the information. Hint: write a middleware function and add it to the exports.
function getGoal(req, res, next){
    userService.getGoals(req.params.username)
    .then(user => res.json(user))
    .catch(err => next(err));
}

//set goal from front end and 
//TODO: set goals (calorie goal and minute goal) for a user. Hint: write a middleware function and add it to the module exports.
function setGoal(req, res, next){
    userService.setGoal(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}