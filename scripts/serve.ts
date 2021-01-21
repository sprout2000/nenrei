import path from 'path';
import express from 'express';

const app = express();

app.listen(8080, () => console.log('Running at Port 8080...'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((_req, res) => res.sendStatus(404));
