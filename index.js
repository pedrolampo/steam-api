const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 9001;

const games = [];

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: ['*', 'http://localhost:3000'],
  optionsSuccessStatus: 204,
  methods: 'GET, POST, PUT, DELETE',
};

// fetch(
//   'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=FC247331076EB69673B6D48C88A6D979&steamids=76561198038738480'
// )
//   .then((res) => res.json())
//   .then((data) => console.log(data.response.players));

// Use cors middleware
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  let message = 'Try /games for all of the apps';

  res.send(JSON.parse(message));
});

app.get('/games', (req, res) => {
  fetch('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json')
    .then((res) => res.json())
    .then((data) => {
      data.applist.apps.forEach((game) => games.push(game));
    });

  res.send(games);
});

app.get('/games/:id', (req, res) => {
  const id = req.params.id;

  fetch(`http://store.steampowered.com/api/appdetails?appids=${id}&cc=US`)
    .then((res) => res.json())
    .then((data) => {
      res.send(data[id].data);
    });
});

app.listen(port, () => {
  console.log(`port runing in http://localhost:${port}`);
});
