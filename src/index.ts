import express, { Request, Response } from 'express';
import Stage from './stage/stage';
// import client from './whats';
import config from './config/config';
import tempMSG from './stage/msg';
import DBUser, { cUser } from './db/user';

import router from './router';

const dbuser = new DBUser();
// const stage = new Stage();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const stageIndex = tempMSG.stage.findIndex((element) => element.id === 20);
// const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
// const tmpa = tempMSG.stage[stageIndex].MSGs[1];

// console.log(tmpa.msg[0].type + '  ' + tmpa.msg[0].value);

let verificar = false;
// client.on('ready', () => {
//   console.log('Client is ready!');
//   verificar = true;
// });

let lastProcessedHour = -1;
// verificar tempo de initividade
setInterval(async function () {
  const d = new Date();
  const currentHour = d.getMinutes();
  if (verificar) {
    if (currentHour != lastProcessedHour) {
      // do stuff
      const list = (await dbuser.findall()) as Array<cUser>;
      if (list) {
        list.forEach(async (element) => {
          if (element.expiresAt && element.stg != 0) {
            if (timestage(element.expiresAt, d.getTime())) {
              element.expiresAt = null;

              element.stg = 0;

              await dbuser.updatestage(element);
              // client.sendMessage(
              //   element.from,
              //   'Por falta de interacao seu atendimento foi encerrado'
              // );
              console.log(
                'Por falta de interacao seu atendimento foi encerrado   ' +
                  element.from
              );
            }
          }
        });
      }

      console.log('new hour', d);
      // console.log('new hour', d.getDate());
      // console.log('new hour', d.getDay());
      // console.log('new hour', d.getFullYear());
      // console.log('new hour', d.getMonth());
      // console.log('new hour', d.getTime());

      lastProcessedHour = currentHour;
    }
  }
}, 1000);
// verificar tempo de initividade
function timestage(expireStage: number, d: number) {
  // 10800 = 3 horas
  const tmp = (d - 10800) / 1000;

  const t = expireStage - tmp;
  if (t < 0) {
    console.log('true');
    return true;
  } else {
    console.log('false');
    return false;
  }
}
//app.use('/api.v1', router);

//config listen
app.use('/', router);
// app.post('/whatsender', async (req, res) => {
//   console.log('post', req.body);
// });

// app.get('/whatsender', async (req, res) => {
//   const { query } = req;
//   const { msg, to } = query;
//   console.log('get', query);
//   console.log('msg = \n', msg, to);
//   return res.status(200).json({ ok: true, msg: msg, to: to });
// });

const port = config.port;
const host = config.ip;

app.listen(port, host, () => {
  console.log(`server is listening on port ${port}`);
});
