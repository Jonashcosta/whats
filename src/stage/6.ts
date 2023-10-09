import { Location, Message } from 'whatsapp-web.js';
import stage_0 from './0';
import DBUser from '../db/user';
import config from '../config/config';
import msg, { MSGS, MSG_TYPE } from './msg';
import util from '../util';
import client from '../whats';
import tempMSG from './msg';

interface cUser {
  id: number | undefined;
  from: string;
  notifyName: string | undefined;
  timestamp: number | undefined;
  stg: number | undefined;
  createdAt: Date | undefined;
  expiresAt: number | undefined;
  updatedAt: Date | undefined;
}
class stage_6 {
  private dbuser = new DBUser();
  private Stage_0 = new stage_0();

  private util = new util();
  async execute(message: Message) {
    const user: cUser = {
      id: undefined,
      from: message.from,
      notifyName: undefined,
      timestamp: undefined,
      stg: undefined,
      createdAt: undefined,
      expiresAt: message.timestamp + config.expiresAt,
      updatedAt: undefined,
    };
    /**
     * ok falar com atendimento bot vai
     * ignorar ate atendimeto ser encerrado ou cliente nao responde
     * enviar para stage 999
     */

    /**
     *
     *
     * verificar mensagem do cliente
     *
     *
     */

    const GetMessage = (await client.getChatById(message.from))
      .fetchMessages({
        limit: 2,
        fromMe: true,
      })
      .then((res) => {
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          //   console.log('texdo antigo do bot    \n', element.body);
        }
        // console.log('mensagen do cliente   ', message.body);
        const stageIndex = tempMSG.stage.findIndex(
          (element) => element.id === 1
        );

        const resp = tempMSG.stage[stageIndex].MSGs;
        for (let index = 0; index < resp.length; index++) {
          const Array_MSGs = resp[index];
          // console.log('possibilidaddes  ' + index + '   ', Array_MSGs.msg);
          for (let index2 = 0; index2 < Array_MSGs.msg.length; index2++) {
            const MSGs = Array_MSGs.msg[index2];
            //console.log('Mensagens  ' + index2 + '   ', MSGs);
            if (MSGs.value.toUpperCase() === message.body.toUpperCase()) {
              //    console.log('deu certo   ', Array_MSGs.msg[0].value);
              return { msg: [Array_MSGs.msg[0]] };
            }
          }
        }

        return {
          msg: [
            {
              type: MSG_TYPE.title,
              value: res[0].body,
            },
          ],
        };
      });

    //   console.log('GetMessage ', await GetMessage);
    const stageIndex = tempMSG.stage.findIndex(
      (element) => element.id === 1601
    );
    const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
    const index = (await GetMessage).msg[0].value;
    console.log('index   ', index);
    //   if((await GetMessage).msg[0].value > '0' && (await GetMessage).msg[0].value <= qtdMSG+"") {
    if (index > '0' && index <= qtdMSG + '') {
      console.log('index   ', index);
      //if (index == '5') {
      user.from = message.from;
      user.stg = 999;
      user.expiresAt = message.timestamp + 15; // 3600 = 1h;
      this.dbuser.updatestage(user);

      const msg = tempMSG.stage[stageIndex].MSGs[parseInt(index) - 1];
      return { ArrayMSG: msg, delay: tempMSG.stage[stageIndex].delay };
      /**
       * enviar formulario
       * enviar stage 950 e nao responde
       */
    }
    //  }
  }
}

export default stage_6;
