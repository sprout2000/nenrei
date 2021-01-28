import fs from 'fs';
import os from 'os';
import path from 'path';
import https from 'https';
import express from 'express';

import open from 'open';

const app = express();
const keyPath = path.resolve(os.homedir(), '.pem/localhost-key.pem');
const certPath = path.resolve(os.homedir(), '.pem/localhost.pem');

const options: https.ServerOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

app.use(express.static('public'));
app.use((_req, res) => res.sendStatus(404));

const server = https.createServer(options, app);
server.listen(8080);

open('https://localhost:8080');
