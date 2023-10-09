import client from './createsession';
import DBUser, { cUser } from '../db/user';
import Sed from './classSender';
import Stage from '../stage/stage';
import { MSGS } from '../stage/msg';
export interface ResultMSG {
  ArrayMSG: MSGS;
  delay: number;
}
const dbuser = new DBUser();
const stage = new Stage();
const sed = new Sed();

client.on('ready', () => {
  console.log('Client is Open to send!');

  client.on('message', async (message) => {
    const stg = (await dbuser.find(message.from)) as cUser;

    console.log('index stg', stg?.stg);
    console.log('message', message.from);
    console.log('message', message.body);

    if (message.body === '!ping') {
      if (stg) {
        stg.stg = 0;
        console.log(await dbuser.updatestage(stg));
        message.reply('stg  ' + 0);
      }
    } else if (stg?.stg != 999) {
      if (
        message.from.includes('@c.us') &&
        message.from == '558494521415@c.us' // message.type == 'chat'
      ) {
        //if (message.from.includes('@c.us')) {
        const { ArrayMSG, delay } = (await stage.getstage(
          message
        )) as ResultMSG;

        // console.log('ArrayMSG tamanho ', ArrayMSG.msg.length);
        // console.log('ArrayMSG  ', ArrayMSG.msg);
        console.log('Sender ArrayMSG  ', ArrayMSG);
        if (ArrayMSG && delay) {
          sed.SendMSG(ArrayMSG, message.from, delay);
        } else {
          console.log('sener underfid');
        }

        /**
         * 
         * 
         * 
         * 
         *     
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 











         */
        // if (ArrayMSG.msg) {
        //   let tmp = '';
        //   let index = 1;
        //   for (let idx = 0; idx < ArrayMSG.msg.length; idx++) {
        //     const e = ArrayMSG.msg[idx];
        //     if (e.type === MSG_TYPE.text) {
        //       tmp += ` ${index}  ${e.value}`;
        //       index++;
        //     } else if (e.type === MSG_TYPE.title) {
        //       tmp += e.value;
        //       index = 1;
        //     } else if (e.type === MSG_TYPE.send_msg) {
        //       await sed
        //         .SendTo(tmp, message.from, delay)
        //         .then((res) => console.log('sender tmt temporario'));
        //       await sed
        //         .SendTo(e.value, message.from, delay)
        //         .then((res) => console.log('sender messagen send'));
        //       tmp = '';
        //       index = 1;
        //     }
        //   }

        // ArrayMSG.msg.forEach((e, i) => {
        //   if (e.type === MSG_TYPE.text) {
        //     tmp += ` ${index}  ${e.value}`;
        //     index++;
        //   } else if (e.type === MSG_TYPE.title) {
        //     tmp += e.value;
        //     index = 1;
        //   } else if (e.type === MSG_TYPE.send_msg) {
        //     sed
        //       .SendTo(tmp, message.from, delay)
        //       .then((res) => console.log('sender tmt temporario'));
        //     sed
        //       .SendTo(e.value, message.from, delay)
        //       .then((res) => console.log('sender messagen send'));
        //     tmp = '';
        //     index = 1;
        //   }
        // });

        // await sed
        //   .SendTo(tmp, message.from, delay)
        //   .then((res) => console.log('sender log'));
      }
    }
  });
});

export default client;
