const db = require('../_helpers/database');
const PArecord = db.PArecord;
const User = db.User;

module.exports = {
    getAllPArecords,
    addPArecord,
    deletePArecord,
    getMyProgress, 
    getRanking
}


//TODO: write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports. Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.

async function deletePArecord(date, username){
    return PArecord.deleteOne({createdBy: username, createdDate: date});
}

async function getAllPArecords(){
    return await PArecord.find();
}

async function getRanking(){
    var user = await User.find();
    var results = [];

    for(var i in user){
        var record = await PArecord.find({createdBy: user[i]._id});
        var sumcal = 0;
        var summin = 0;
        var length = 0;
        for(var j in record){
            sumcal += record[j].calories;
            summin += record[j].minutes;
            length++;
        }
        if(sumcal !== 0){
            const result = {
                username: user[i].username,
                first: user[i].firstName,
                last: user[i].lastName,
                avgcalories: Math.round(sumcal/ length),
                avgminutes: Math.round(summin/ length),
                calgoal: user[i].caloriegoal,
                minutegoal: user[i].minutegoal,
            }
            results.push(result);
        }
    }
    return results;
}

async function getMyProgress(username){
    return await PArecord.find({createdBy: username});
}


async function addPArecord(parecord, username) {
    if (await PArecord.findOne({ createdBy: username, createdDate: parecord.createdDate })) {
        const filter = { 
            createdBy: username,
            createdDate: parecord.createdDate
         };
        const update = { 
            activityType: parecord.activityType,
            calories: parecord.calories,
            minutes: parecord.minutes,
            steps: parecord.steps

        };
        return await PArecord.updateOne(filter, update);
    }
    else if(!username){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }
    else{
        let newrecord= parecord;
        parecord.createdBy = username;
    
        dbrecord = new PArecord(newrecord);
    
        // save the record
        return await dbrecord.save();
    }


}
