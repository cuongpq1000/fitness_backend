const parecordService = require('../services/parecord.service')
module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord,
    getMyProgress,
    getRanking
};

async function getRanking(req, res, next){
  parecordService.getRanking().then((result) => {
    res.send(result);
  }).catch(err => console.log(err));
}

async function createPArecord(req, res, next) {
  //TODO: via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.
  parecordService.addPArecord(req.body, req.user.sub).then((result) => res.json(result)).catch((e) => next(e))  

}

function getMyProgress(req, res, next){
  parecordService.getMyProgress(req.user.sub)
  .then((result) => res.send(result))
  .catch((e) => console.log(e));
}

function getPArecords(req,res,next){
//TODO: return all parecords from the database and send to the client.
  parecordService.getAllPArecords().then((result) => {
    res.send(result);
  }).catch(
    (error) => console.log(error)
  )
}

function deletePArecord(req,res,next){
//TODO: delete parecord from the database and respond to the client by conforming the action.
  parecordService.deletePArecord(req.params.date, req.user.sub).then((result) => res.json(result)).catch((e) => next(e))  
}
