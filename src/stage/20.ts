import WAWebJS from 'whatsapp-web.js';
import Ura from '../SGPURA/ura';
import client from '../whats';
import DBUser, { cUser } from '../db/user';
import config from '../config/config';
import tempMSG, { MSGS, MSG_TYPE } from './msg';
import { ResultMSG } from '../whats/sender';
export interface b {
  fraase: string[];
}
class stage_20 {
  private ura = new Ura();
  private dbuser = new DBUser();
  async execute(message: WAWebJS.Message): Promise<ResultMSG> {
    const dbuser = new DBUser();

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
     * pegar as mensagens do cliente e do bot
     */
    const a = (await client.getChatById(message.from)).fetchMessages({
      limit: 3,
      fromMe: false,
    });
    /**
     * separa as mensagens
     */
    const b = getcontratoString(await a, message);

    if (b) {
      if (b[3] == 'Ativo') {
        // contratos ativos
        const c = this.enviarFatura(b);
        user.stg = 0;
        user.expiresAt = message.timestamp + config.expiresAt;
        dbuser.updatestage(user);

        return c;
      } else if (b[3] == 'Suspenso') {
        // contratos Suspenso
        user.from = message.from;
        const msg = await this.enviarFatura(b);
        msg.ArrayMSG.msg.push({
          type: MSG_TYPE.send_msg,
          value: `Enviar comprovante para que possomos libera seu acesso`,
        });
        user.stg = 0;
        user.expiresAt = message.timestamp + config.expiresAt;
        dbuser.updatestage(user);
        return msg;
      } else
        return {
          // contratos Cancelado
          ArrayMSG: { msg: [{ type: MSG_TYPE.text, value: 'Cancelado' }] },
          delay: 2,
        };
    } else {
      const d = getreltString(await a);
      console.log(d);
      return {
        ArrayMSG: { msg: [{ type: MSG_TYPE.text, value: d }] },
        delay: 2,
      };
    }
  }
  async enviarFatura(b: string[]): Promise<ResultMSG> {
    const res = await this.getfaturas(b).then((res) => {
      const stageIndex = tempMSG.stage.findIndex(
        (element) => element.id === 20
      );
      const titulos: MSGS = {
        msg: [tempMSG.stage[stageIndex].MSGs[0].msg[0]],
      };
      let qtd = 0;
      const datenew = new Date().getTime();

      const email_status = [];
      const email_endereco = [];

      email_status[0] = 1;
      email_endereco[0] = '';

      if (res?.titulos)
        for (let index = 0; index < res?.titulos.faturas.length; index++) {
          const element = res.titulos.faturas[index];

          const date = new Date(element.vencimento).getTime();
          if (element.status == 'Gerado' && datenew > date) {
            qtd++;
            titulos.msg.push({
              type: MSG_TYPE.title,
              value: `(${qtd})   ${element.vencimento} valor *${element.valorcorrigido}* \nlink do boleto\n${tempMSG.stage[stageIndex].MSGs[1].msg[0].value}${element.link} \n\ncodigo PIX`,
            });
            titulos.msg.push({
              type: MSG_TYPE.send_msg,
              value: `${element.codigopix}`,
            });
          }

          /**
           * caso boleto gerado data seja  proximo mes imprimir 1
           */
          if (qtd == 0) {
            if (res)
              for (
                let index = 0;
                index < res?.titulos.faturas.length;
                index++
              ) {
                const element = res.titulos.faturas[index];

                if (element.status == 'Gerado' && qtd < 1) {
                  qtd++;
                  titulos.msg.push({
                    type: MSG_TYPE.title,
                    value: `(${qtd})   ${element.vencimento} valor *${element.valorcorrigido}* \nlink do boleto\n${tempMSG.stage[stageIndex].MSGs[1].msg[0].value}${element.link} \n\ncodigo PIX`,
                  });
                  titulos.msg.push({
                    type: MSG_TYPE.send_msg,
                    value: `${element.codigopix}`,
                  });
                }
              }
          }
        }

      titulos.msg.push({
        type: MSG_TYPE.send_msg,
        value: tempMSG.stage[stageIndex].MSGs[2].msg[0].value, //
      });

      /**
       *
       * enviar emails
       */

      async () => {
        if (res?.contrato.emails) {
          const emails = res?.contrato.emails;
          if (emails) {
            for (let index = 0; index < emails.length; index++) {
              const element = emails[index];
              const sendEmail = await this.ura.enviarEmail({
                cpfcnpj: res?.contrato.cpfCnpj,
                contrato: res?.contrato.contratoId as number,
                senha: res.contrato.contratoCentralSenha,
                email: element,
              });
              console.log(
                'email_status  ',
                sendEmail.status,
                '   res   ',
                element
              );
              email_status[index] = sendEmail.status;
              email_endereco[index] = element;
            }
          }
        }
      };

      /**
       *
       * mostras os email para onte foi enviar
       */
      if (email_status[0] == 1) {
        titulos.msg.push({
          type: MSG_TYPE.send_msg,
          value: tempMSG.stage[stageIndex].MSGs[3].msg[0].value,
        });
        if (res?.contrato.emails)
          for (let index = 0; index < res.contrato.emails.length; index++) {
            const element = res.contrato.emails[index];
            titulos.msg.push({
              type: MSG_TYPE.title,
              value: `*Fatura enviada* ${element}  \n`,
            });
          }

        /**
         *
         * quando nao exite titlos para contrato
         */
      } else if (res?.titulos.faturas.length == 0) {
        titulos.msg.push({
          type: MSG_TYPE.send_msg,
          value: `*Nao existe faturas para esse contrato*\n\n`,
        });

        //msg += '\n\n Nao existe faturas para esse contrato';
        /**
         *
         * quando nao tem email cadastrado
         *  */
      } else if (email_status[0] == 0) {
        titulos.msg.push({
          type: MSG_TYPE.send_msg,
          value: `*cadastre um email*\n\n`,
        });
      }
      console.log('stage20', {
        ArrayMSG: titulos,
        delay: tempMSG.stage[stageIndex].delay,
      });
      return {
        ArrayMSG: titulos,
        delay: tempMSG.stage[stageIndex].delay,
      };
    });

    return res;
  }

  async getfaturas(b: string[]) {
    const c = await this.ura
      .contrato(b[4])
      .then(async (res) => {
        let idx = 999;

        if (res.contratos) {
          idx = res.contratos.findIndex(
            (contrato) => contrato.contratoId == parseInt(b[2])
          );

          const titulos = await this.ura.listTitulos({
            cpfcnpj: res.contratos[idx].cpfCnpj as string,
            senha: res.contratos[idx].contratoCentralSenha,
            contrato: res.contratos[idx].contratoId as number,
          });

          const contrato = res.contratos[idx];
          const resp = { titulos, contrato };
          return resp;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return c;
  }
}

function getcontratoString(res: WAWebJS.Message[], mess: WAWebJS.Message) {
  const body = getreltString(res);

  if (res) {
    let status: string[] = [];
    const idx = body.indexOf(`${mess.body}  => `);
    if (idx == -1) {
      const idx = body.indexOf(`${mess.body}`);
      status = body
        .substring(idx - 6, idx - 6 + 20)
        .replace('  ', ' ')
        .split(' ');
    } else {
      status = body
        .substring(idx, idx + 20)
        .replace('  ', ' ')
        .split(' ');
    }
    const idxcpfcnpj = body.indexOf('cpf/cnpj');
    const cpfCnpj = body
      .substring(idxcpfcnpj, idxcpfcnpj + 30)
      .trim()
      .split('*');
    console.log('cpfcnpj\n', cpfCnpj);
    console.log('idx\n', idx);
    console.log('idxcpfcnpj\n', idxcpfcnpj);

    status[4] = cpfCnpj[1];
    console.log(status);
    status.forEach((element, index) => {
      console.log('index ' + index, element);
    });
    return status;
  } else return '';
}
function getreltString(res: WAWebJS.Message[]) {
  if (res) {
    for (let index = 0; index < res.length; index++) {
      if (
        res[index].body.length >= 50 &&
        res[index].body.includes('Escolha um dos Contrato')
      ) {
        //  console.log('index body  ', index);
        return res[index].body.trim();
      }
    }
  }
  return '';
}

export default stage_20;
/**
 * b[]
 *
 * index 0 1
 * index 1 =>
 * index 2 5782
 * index 3 Ativo
 * index 4 101.833.194-86
 *
 *
 */
