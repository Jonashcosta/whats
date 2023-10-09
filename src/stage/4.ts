import WAWebJS from 'whatsapp-web.js';
import DBUser from '../db/user';
import util from '../util';

import Ura, { contratoCliente, sgpContratoCliente, wer } from '../SGPURA/ura';
import config from '../config/config';
import msg from './msg';
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
class stage_4 {
  ura = new Ura();
  private dbuser = new DBUser();
  private util = new util();
  async execute(message: WAWebJS.Message) {
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

    // await this.dbuser.updatestage(user);
    let cpf = message.body.replace(/\./g, '');
    cpf = cpf.replace('-', '');

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
          let idx = 1;
          if (res.contratos)
            if (res.contratos.length > 0) {
              const tmp = [
                `Ola Sr  ${res.contratos[0].razaoSocial}\ncpf/cnpj: *${res.contratos[0].cpfCnpj}* \nEscolha um dos Contrato \n`,
              ];

              res.contratos.forEach((element, index) => {
                if (element.contratoStatusDisplay)
                  if (
                    config.imprimirStatusContrato.includes(
                      element.contratoStatusDisplay.trim()
                    )
                  )
                    if (res.contratoOnline) {
                      if (res.contratoOnline[index].msg) {
                        tmp[idx] = `=> ${
                          element.contratoId
                        } ${element.contratoStatusDisplay?.trim()} ${
                          res.contratoOnline[index].msg
                        } \n`;
                        idx++;
                      } else {
                        tmp[idx] = `=> ${
                          element.contratoId
                        } ${element.contratoStatusDisplay?.trim()} \n`;
                        idx++;
                      }
                    } else {
                      tmp[idx] = `=> ${
                        element.contratoId
                      } ${element.contratoStatusDisplay?.trim()} \n`;
                      idx++;
                    }
              });
              user.from = message.from;
              user.stg = 40;
              user.expiresAt = message.timestamp + config.expiresAt;
              this.dbuser.updatestage(user);
              return tmp;
            } else {
              user.from = message.from;
              user.stg = 0;
              user.expiresAt = message.timestamp + config.expiresAt;
              this.dbuser.updatestage(user);
              // return msg[800][
              //   this.util.randomIntFromInterval(0, msg[800].length - 1)
              // ].msg;
              return ['asda'];
            }
        })
        .catch((error) => console.log(error));

      return promise;
    } else {
      return ['CPF/CNPJ INVALIDO \n digite novamente'];
    }
    if (message.body === '2') {
      //this.dbuser.updatestage(from, 999);
      return [
        'Ola como poderia ajuda?',
        'Para iniciamos o seu atendimento, por gentileza nos confimer Seu CPF/CNPJ',
      ];
    }
  }
}

export default stage_4;

// eslint-disable-next-line no-async-promise-executor
// const promise = new Promise(async (resolv, reject) => {
//   const ress = await this.ura.contrato(message.body);
//   if (ress.contratos) {
//     const tmp = [
//       `Ola Sr  ${ress.contratos[0].razaoSocial}\nEscolha um dos Contrato \n`,
//     ];
//     ress.contratos.forEach(async (element, index) => {
//       tmp[index + 1] = `=> ${element.contratoId} ${
//         element.contratoStatusDisplay
//       } ${await this.ura.contratoVerificarAcesso(
//         element.clienteId + ''
//       )}\n`;
//     });
//     return resolv(tmp);
//   }
// });

// const ress = await this.ura.contrato(message.body);
// const tmp1: string[] = [];
// if (ress.contratos) {
//   ress.contratos.forEach(async (element, index) => {
//     const resss = await this.ura.contratoVerificarAcesso(
//       element.clienteId as unknown as string
//     );

//     tmp1[index] = resss.msg;
//     //console.log(tmp1);
//   });
// }
// if (ress.contratos && tmp1 != undefined) {
//   const tmp = [
//     `Ola Sr  ${ress.contratos[0].razaoSocial}\nEscolha um dos Contrato \n`,
//   ];
//   ress.contratos.forEach((element, index) => {
//     tmp[
//       index + 1
//     ] = `=> ${element.contratoId} ${element.contratoStatusDisplay} ${tmp1[index]}\n`;
//     console.log(tmp1);
//   });
//   console.log(tmp);
//   return tmp;

// user.from = message.from;
// user.stg = 30;
// user.expiresAt = message.timestamp + 7200 / 120;
// this.dbuser.updatestage(user);
// console.log(tmp);
// return tmp;
// }
