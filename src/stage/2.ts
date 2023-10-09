import WAWebJS from 'whatsapp-web.js';
import DBUser from '../db/user';
import util from '../util';

import Ura, { contratoCliente, sgpContratoCliente, wer } from '../SGPURA/ura';
import config from '../config/config';
import tempMSG, { msg, MSGS, MSG_TYPE } from './msg';
import { ResultMSG } from '../whats/sender';
/*
pegar cliente com cpf e consulta os contratos 
*/

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
class stage_2 {
  ura = new Ura();
  private dbuser = new DBUser();
  private util = new util();
  async execute(message: WAWebJS.Message): Promise<ResultMSG> {
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

    let cpf = message.body.replace(/\./g, '');
    cpf = cpf.replace('-', '');
    const stageIndex = tempMSG.stage.findIndex((element) => element.id === 2);

    if (this.util.validaCpfCnpj(cpf)) {
      user.from = message.from;
      user.stg = 900;
      user.expiresAt = message.timestamp + config.expiresAt;
      await this.dbuser.updatestage(user);
      const promise = await this.ura
        .contrato(cpf)
        .then((res) => {
          return res as sgpContratoCliente;
        })
        .then(async (res) => {
          const Contratos: contratoCliente[] = [];

          if (res.contratos)
            if (res.contratos.length > 0)
              for (let index = 0; index < res.contratos.length; index++) {
                const element = res.contratos[index];

                Contratos[index] = await this.ura.contratoVerificarAcesso(
                  element.contratoId + ''
                );
              }
          const resp = {
            msg: res.msg,
            contratos: res.contratos,
            contratoOnline: Contratos,
          } as wer;

          return resp;
        })
        .then((res) => {
          // const idx = 1;
          if (res.contratos)
            if (res.contratos.length > 0) {
              const contrato: MSGS = {
                msg: [
                  {
                    type: MSG_TYPE.title,
                    value: `Ola Sr  ${res.contratos[0].razaoSocial}\ncpf/cnpj: *${res.contratos[0].cpfCnpj}* \nEscolha um dos Contrato \n`,
                  },
                ],
                apikey: process.env.TOKENEVO as string,
              };

              res.contratos.forEach((element, index) => {
                if (element.contratoStatusDisplay)
                  if (
                    config.imprimirStatusContrato.includes(
                      element.contratoStatusDisplay.trim()
                    )
                  )
                    if (res.contratoOnline) {
                      if (res.contratoOnline[index].msg) {
                        contrato.msg.push({
                          type: MSG_TYPE.text,
                          value: `=> ${
                            element.contratoId
                          } ${element.contratoStatusDisplay?.trim()} ${
                            res.contratoOnline[index].msg
                          } \n`,
                        });
                      } else {
                        contrato.msg.push({
                          type: MSG_TYPE.text,
                          value: `=> ${
                            element.contratoId
                          } ${element.contratoStatusDisplay?.trim()} \n`,
                        });
                      }
                    } else {
                      contrato.msg.push({
                        type: MSG_TYPE.text,
                        value: `=> ${
                          element.contratoId
                        } ${element.contratoStatusDisplay?.trim()} \n`,
                      });
                    }
              });
              user.from = message.from;
              user.stg = 20;
              user.expiresAt = message.timestamp + config.expiresAt;
              this.dbuser.updatestage(user);

              return {
                ArrayMSG: contrato,
                delay: tempMSG.stage[stageIndex].delay,
              };
            } else {
              user.from = message.from;
              user.stg = 2;
              user.expiresAt = message.timestamp + config.expiresAt;
              return {
                ArrayMSG: {
                  msg: [
                    {
                      type: MSG_TYPE.title,
                      value: 'Nao exite contratos para esse cpf',
                    },
                  ],
                },
                delay: tempMSG.stage[stageIndex].delay,
              };
            }
        })
        .catch((error) => console.log(error));

      return promise as ResultMSG;
    } else {
      /**
       * 
       * cpf invalido
    
    */
      const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
      const resp =
        tempMSG.stage[stageIndex].MSGs[
          this.util.randomIntFromInterval(0, qtdMSG)
        ];
      return {
        ArrayMSG: {
          msg: resp.msg,
          apikey: process.env.TOKENEVO as string,
        },
        delay: tempMSG.stage[stageIndex].delay,
      };
    }
  }
}

export default stage_2;
// const tmp = [
//   `Ola Sr  ${res.contratos[0].razaoSocial}\ncpf/cnpj: *${res.contratos[0].cpfCnpj}* \nEscolha um dos Contrato \n`,
// ];

// res.contratos.forEach((element, index) => {
//   if (element.contratoStatusDisplay)
//     if (
//       config.imprimirStatusContrato.includes(
//         element.contratoStatusDisplay.trim()
//       )
//     )
//       if (res.contratoOnline) {
//         if (res.contratoOnline[index].msg) {
//           tmp[idx] = `=> ${
//             element.contratoId
//           } ${element.contratoStatusDisplay?.trim()} ${
//             res.contratoOnline[index].msg
//           } \n`;
//           idx++;
//         } else {
//           tmp[idx] = `=> ${
//             element.contratoId
//           } ${element.contratoStatusDisplay?.trim()} \n`;
//           idx++;
//         }
//       } else {
//         tmp[idx] = `=> ${
//           element.contratoId
//         } ${element.contratoStatusDisplay?.trim()} \n`;
//         idx++;
//       }
// });
// user.from = message.from;
// user.stg = 20;
// user.expiresAt = message.timestamp + config.expiresAt;
// this.dbuser.updatestage(user);
// return tmp;
