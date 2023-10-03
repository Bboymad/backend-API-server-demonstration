const express = require('express');
const app = express();
const { getTopics } = require('./controllers/controller.topics')
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require('./errors/errors-controller')

app.use(express.json());

app.get('/api/topics', getTopics);

// app.get('/api', getEndpoints)

// Error Handling
// app.use((err, req, res, next) => {
//     console.error(err);
  
//     if (err.code) {
//       switch (err.code) {
//         case '23502':
//         case '22P02':
//         case '23503':
//           res.status(400).send({ msg: 'bad request' });
//           break;
//         default:
//           res.status(500).send({ msg: 'Internal server error' });
//       }
//     }
//     if (err.status) {
//       res.status(err.status).send({ msg: err.msg });
//     }
//   });
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
  
module.exports = app;