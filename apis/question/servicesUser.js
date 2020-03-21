// const express = require('express');
// const router = express.Router();
// let {PythonShell} = require('python-shell')
// const Question = require('../models/questionModel').Question;
// const path = require('path');
// const userCheck = require('../../../middleware/userCheck').checkUser;
// //router.use(userCheck);
// router.get('/getQuestion1',userCheck,(req,res)=>{
//     let students_per_section = 40                 // Need user input for number of sections
//     let options = {
//         mode: 'text',
//         pythonOptions: ['-u'],
//         scriptPath: 'Education Scripts/',//Path to your script
//         args: ['/UserData/'+req.userId,students_per_section]
//     };
//     PythonShell.run('Question1.py',options, function (getQuestion1Err, getQuestion1Status) {
//         if(getQuestion1Err){
//             res.send(getQuestion1Err);
//         }
//         else{
//             if(getQuestion1Status[getQuestion1Status.length-1] === '200'){
//                 res.status(200).sendfile('UserData/'+req.userId+'/Question1.csv');
//             }
//             else{
//                 res.status(400).send({'result':'error'});
//             }
//
//         }
//     });
// })
// router.get('/get', async (req, res) => {
//     try {
//         let questions = await Question.get();
//         res.status(200).send({
//             'result': questions
//         });
//     } catch (error) {
//         res.status(400).send({
//             'result': error
//         });
//     }
// });
//
//
// module.exports = router;