import { Location, Message } from 'whatsapp-web.js';
import stage_0 from './0';
import DBUser from '../db/user';
import config from '../config/config';
import msg, { MSGS, MSG_TYPE } from './msg';
import util from '../util';
import client from '../whats';
import tempMSG from './msg';
import { ResultMSG } from '../whats/sender';

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
class stage_1 {
  private dbuser = new DBUser();
  private Stage_0 = new stage_0();

  private util = new util();
  async execute(message: Message): Promise<ResultMSG> {
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
              if (Array_MSGs.msg[0].value == '1') {
                user.from = message.from;
                user.stg = 999;
                user.expiresAt =
                  message.timestamp + config.expiresAtAtendimento;
                this.dbuser.updatestage(user);

                const resp = tempMSG.stage.findIndex(
                  (element) => element.id === 1999
                );
                // return tempMSG.stage[resp].MSGs;
              }
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

    if ((await GetMessage).msg[0].value == '1') {
      user.from = message.from;
      user.stg = 999;
      user.expiresAt = message.timestamp + config.expiresAtAtendimento;
      this.dbuser.updatestage(user);

      const stageIndex = tempMSG.stage.findIndex(
        (element) => element.id === 1000
      );
      const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
      const msg =
        tempMSG.stage[stageIndex].MSGs[
          this.util.randomIntFromInterval(0, qtdMSG)
        ];

      return { ArrayMSG: msg, delay: tempMSG.stage[stageIndex].delay };
      /**
       *
       *
       *
       *
       */
    } else if ((await GetMessage).msg[0].value == '2') {
      /**
       * enviar fatura do cliente
       * pedir o cpf
       */
      {
        user.from = message.from;
        user.stg = 2;
        user.expiresAt = message.timestamp + config.expiresAt;
        this.dbuser.updatestage(user);

        const stageIndex = tempMSG.stage.findIndex(
          (element) => element.id === 1001
        );
        const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
        const msg =
          tempMSG.stage[stageIndex].MSGs[
            this.util.randomIntFromInterval(0, qtdMSG)
          ];

        return { ArrayMSG: msg, delay: tempMSG.stage[stageIndex].delay };
      }
      /**
       *
       *
       *
       *
       */
    } else if ((await GetMessage).msg[0].value == '3') {
      /**
       * pegar uma promessa de pagamento se nao tiver nenhuma
       * ou soliciar ao atendimento
       * pedir cpf
       * enviar para stage 3
       */
      user.from = message.from;
      user.stg = 3;
      user.expiresAt = message.timestamp + config.expiresAt;
      this.dbuser.updatestage(user);
      const stageIndex = tempMSG.stage.findIndex(
        (element) => element.id === 1001
      );
      const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
      const msg =
        tempMSG.stage[stageIndex].MSGs[
          this.util.randomIntFromInterval(0, qtdMSG)
        ];

      return { ArrayMSG: msg, delay: tempMSG.stage[stageIndex].delay };
      /**
       * pedir cpf para mostra os contratos do cliente
       * enviar para stage 40
       */
    } else if ((await GetMessage).msg[0].value == '4') {
      user.from = message.from;
      user.stg = 4;
      user.expiresAt = message.timestamp + config.expiresAt;
      this.dbuser.updatestage(user);
      const stageIndex = tempMSG.stage.findIndex(
        (element) => element.id === 1001
      );
      const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
      const msg =
        tempMSG.stage[stageIndex].MSGs[
          this.util.randomIntFromInterval(0, qtdMSG)
        ];

      return { ArrayMSG: msg, delay: tempMSG.stage[stageIndex].delay };
    } else if ((await GetMessage).msg[0].value == '5') {
      /**
       * encerra o atendimento
       * enviar para stage 0
       */
      user.from = message.from;
      user.stg = 999;
      (user.expiresAt = message.timestamp + 15), // 3600 = 1h;
        this.dbuser.updatestage(user);
      const stageIndex = tempMSG.stage.findIndex(
        (element) => element.id === 1005
      );
      const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
      const msg =
        tempMSG.stage[stageIndex].MSGs[
          this.util.randomIntFromInterval(0, qtdMSG)
        ];

      return { ArrayMSG: msg, delay: tempMSG.stage[stageIndex].delay };
      /**
       * enviar formulario
       * enviar stage 950 e nao responde
       */
    } else if ((await GetMessage).msg[0].value == '6') {
      user.from = message.from;
      user.stg = 6;
      user.expiresAt = message.timestamp + config.expiresAt;
      this.dbuser.updatestage(user);
      const stageIndex = tempMSG.stage.findIndex(
        (element) => element.id === 1600
      );
      const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
      const msg =
        tempMSG.stage[stageIndex].MSGs[
          this.util.randomIntFromInterval(0, qtdMSG)
        ];

      return { ArrayMSG: msg, delay: tempMSG.stage[stageIndex].delay };
    } else {
      const resp = await this.Stage_0.execute(message);

      //resp[0] =""
      //msg[1][this.util.randomIntFromInterval(0, msg[1].length - 1)].msg[0];

      return resp;
    }
  }
}

export default stage_1;
