// import WAWebJS from 'whatsapp-web.js';
import axios from 'axios';
import { MSGS, MSG_TYPE } from '../stage/msg';
import util from '../util';
// import client from '../whats';

class Sender {
  private util = new util();

  // async execute(message: WAWebJS.Message) {
  //   client.sendMessage(message.from, message.body);
  //   return '';
  // }
  // .post('http://45.171.229.6:5700/message/sendText/jonas', {
  //   number: to,
  //   options: {
  //     delay: 1200,
  //     presence: 'composing',
  //   },
  //   textMessage: {
  //     text: message,
  //   },
  // },

  //   Headers: {
  //       'Content-Type': 'application/json'
  private async SendTo(
    message: string,
    to: string,
    token: string,
    delay: number
  ) {
    await this.util.delay(delay).then(() => {
      console.log(token, to, message);
      axios({
        method: 'post',
        url: 'http://45.171.229.6:5700/message/sendText/jonas',
        headers: {
          'Content-type': 'application/json',
          apikey:
            '11914c4d920715ac20edc3efbb8802d1d8aa8a47623755861c2acad4f79809fd',
        },
        data: {
          number: '5584994521415',
          options: {
            delay: 1200,
            presence: 'composing',
          },
          textMessage: {
            text: message,
          },
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  }
  // async SendFile(message: string, to: string) {
  //
  //   return '';
  // }

  async SendMSG(ArrayMSG: MSGS, from: string, delay: number) {
    if (ArrayMSG.msg) {
      let tmp = '';
      let index = 1;
      let checksend: boolean;
      checksend = false;
      const token = ArrayMSG.apikey;

      for (let idx = 0; idx < ArrayMSG.msg.length; idx++) {
        const e = ArrayMSG.msg[idx];
        if (e.type === MSG_TYPE.text) {
          tmp += ` ${index}  ${e.value}`;
          index++;
        } else if (e.type === MSG_TYPE.title) {
          tmp += e.value;
          index = 1;
        } else if (e.type === MSG_TYPE.send_msg) {
          if (tmp.length > 0)
            await this.SendTo(tmp, from, token, delay).then((res) =>
              console.log('sender tmt temporario')
            );

          await this.SendTo(e.value, from, token, delay).then((res) =>
            console.log('sender messagen send')
          );
          tmp = '';
          index = 1;
          checksend = true;
        }
      }
      if (tmp.length > 0) console.log('SendTo');
      await this.SendTo(tmp, from, token, delay).then((res) => {
        console.log('sender tmt ');
      });
    }
  }
}

export default Sender;
