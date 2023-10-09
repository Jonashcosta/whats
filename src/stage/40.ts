import WAWebJS from 'whatsapp-web.js';
import Ura, { contratoCliente, sgpContratoCliente } from '../SGPURA/ura';
import stage_30 from './30';
import client from '../whats';
import DBUser, { cUser } from '../db/user';
import config from '../config/config';

class stage_40 {
  private Stage_30 = new stage_30();
  async execute(message: WAWebJS.Message) {
    const dbuser = new DBUser();
    const ura = new Ura();

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

    client.on('message', async (msg) => {
      const stg = (await dbuser.find(msg.from)) as cUser;
      if (message.body === '!ping') {
        if (stg) {
          stg.stg = 0;
          console.log(await dbuser.updatestage(stg));

          message.reply('stg  ' + 0);
        }
      }
    });

    const a = (await client.getChatById(message.from)).fetchMessages({
      limit: 3,
      fromMe: false,
    });

    const b = getcontratoString(await a, message);

    if (b) {
      if (b[3] == 'Ativo') {
        const c = await ura
          .contratoVerificarAcesso(b[2])

          .then(async (res) => {
            const cpf = await ura.contrato(res.cpfCnpj);
            const contrato = res;
            const resp = { contrato, cpf };
            return resp;
          })
          .then(async (res) => {
            if (res.cpf.contratos)
              return await ura.criarChamado({
                cpfcnpj: res.contrato.cpfCnpj,
                senha: res.cpf.contratos[0].contratoCentralSenha,
                contrato: res.contrato.contratoId,
                contato: res.contrato.razaoSocial,
                contato_numero: message.from.replace('@c.us', ''),
                conteudo: `Sem acesso a internet contato ${message.from.replace(
                  '@c.us',
                  ''
                )}`,
                motivoos: '40',
                ocorrenciatipo: '1',
              });
          })
          .then(async (res) => {
            user.from = message.from;
            user.stg = 0;
            user.expiresAt = message.timestamp + config.expiresAt;
            dbuser.updatestage(user);
            return [
              ` Prontinho Sr ${res?.razaosocial} \n agora so espera tecnico chegar \n Seu Protocolo ${res?.protocolo} `,
            ];
          })
          .catch((error) => {
            console.log(error);
          });

        return c;
      } else if (b[3] == 'Suspenso') {
        user.from = message.from;
        user.stg = 30;
        user.expiresAt = message.timestamp + config.expiresAt;
        dbuser.updatestage(user);
        return await this.Stage_30.execute(message);
      } else return ['Cancelado'];
    } else {
      const d = getreltString(await a);
      console.log(d);
      return [d];
    }
  }
}

function getcontratoString(res: WAWebJS.Message[], mess: WAWebJS.Message) {
  const body = getreltString(res);
  console.log('body\n', body);
  console.log('res\n', res[2].body);
  console.log('mess\n', mess.body);

  if (res) {
    //const idx = res[1].body.indexOf(`${res[2].body}  => `);

    const idx = body.indexOf(`${mess.body}  => `);
    const idxcpfcnpj = body.indexOf('cpf/cnpj');
    const cpfCnpj = body
      .substring(idxcpfcnpj, idxcpfcnpj + 30)
      .trim()
      .split('*');
    console.log('cpfcnpj\n', cpfCnpj);
    console.log('idx\n', idx);
    console.log('idxcpfcnpj\n', idxcpfcnpj);

    const status = body
      .substring(idx, idx + 20)
      .replace('  ', ' ')
      .split(' ');
    status[4] = cpfCnpj[1];
    console.log(status);
    status.forEach((element, index) => {
      console.log('index ' + index, element);
    });
    // console.log(contrato);
    return status;
  } else return '';
}
function getreltString(res: WAWebJS.Message[]) {
  if (res) {
    for (let index = 0; index < res.length; index++) {
      if (
        res[index].body.length >= 50 &&
        res[index].body.indexOf('Escolha um dos Contrato') > 5
      ) {
        console.log('index body  ', index);
        return res[index].body.trim();
      }
    }
  }
  return '';
}
// function getcontratoString(res: WAWebJS.Message[]) {
//   if (res) {
//     const idx = res[1].body.indexOf(`${res[2].body}  => `);

//     const status = res[1].body
//       .substring(idx, idx + 20)
//       .replace('  ', ' ')
//       .split(' ');
//     status[4] = res[0].body;
//     console.log(status);
//     status.forEach((element, index) => {
//       console.log('index ' + index, element);
//     });
//     // console.log(contrato);
//     return status;
//   } else return '';
// }
// function getreltString(res: WAWebJS.Message[]) {
//   if (res) {
//     for (let index = 0; index < res.length; index++) {
//       if (res[index].body.length >= 50) {
//         return res[index].body.trim();
//       }
//     }
//   } else return '';
// }

export default stage_40;
