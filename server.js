'use strict'

const express = require('express');
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');

app.get("/project-create", (req, res) => {
  return res.json('hello create');
});

app.get("/project-delete", (req, res) => {
  return res.json('hello delete');
});

app.get("/project-edit", (req, res) => {
  return res.json('hello edit');
});

app.get("/project-view", (req, res) => {
  return res.json('hello view');
});

app.get("/projects-list", (req, res) => {
  return res.json('hello projects');
});
// this function connects to our database, then starts the server
/*function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}*/

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

module.exports = { app };
