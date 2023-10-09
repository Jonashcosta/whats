import WAWebJS from 'whatsapp-web.js';
import Ura, { contratoCliente, sgpContratoCliente } from '../SGPURA/ura';
import client from '../whats';
import DBUser, { cUser } from '../db/user';
import config from '../config/config';

class stage_30 {
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
      limit: 8,
      fromMe: false,
    });
    // .then((res) => {
    //   for (let index = 0; index < res.length; index++) {
    //     const element = res[index];
    //     if (message.from == element.from) {
    //       console.log('index  == ' + index);
    //     } else {
    //       console.log('index  != ' + index);
    //     }
    //   }
    //   return res;
    // });

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
                conteudo: `contrado ativo porem sem Acesso a internet ${message.from.replace(
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
              ` Prontinho Sr ${res?.razaosocial} \n como seu contrato esta ativo abrimos uma Orden de serviço\n para verificar motivo do que senho esta sem acesso a internet \n Seu Protocolo ${res?.protocolo} `,
            ];
          })
          .catch((error) => {
            console.log(error);
          });

        return c;
      } else if (b[3] == 'Suspenso') {
        const c = await ura
          .contrato(b[4])
          .then(async (res) => {
            ('');
            if (res.contratos) {
              let idx = 999;
              for (let index = 0; index < res.contratos.length; index++) {
                const element = res.contratos[index];
                if (element.contratoId === parseInt(b[2])) idx = index;
              }
              console.log('idx', idx);
              const promessaPag = await ura.promessaPagamento({
                cpfcnpj: res.contratos[idx].cpfCnpj,
                senha: res.contratos[idx].contratoCentralSenha,
                contrato: res.contratos[idx].contratoId,
              });
              const resp = { promessaPag, res, idx };
              return resp;
            }
          })
          .then(async (res) => {
            user.from = message.from;
            user.stg = 0;
            user.expiresAt = message.timestamp + config.expiresAt;
            dbuser.updatestage(user);

            let msg = '';
            if (res?.promessaPag.status == 1) {
              msg = ` Prontinho Sr ${res?.promessaPag.razaosocial} \n ${res?.promessaPag.msg}  \n Seu Protocolo ${res?.promessaPag.protocolo} `;
            } else if (res?.promessaPag.status == 2) {
              if (res?.res.contratos) {
                msg = ` Sr ${res?.promessaPag.razaosocial} \n *${
                  res?.promessaPag.msg
                }* \n\n quantidade de promessa em 30 dias *${
                  res?.res.contratos[res.idx].promessasPagamentoMes
                }*  \n\n Mais ainda pode deixa mensagem solicitando um atendente vai verificar \n se ainda e possivel  `;
              }
            } else {
              console.log(res?.promessaPag);
              msg = ` Sr ${res?.promessaPag.razaosocial} \n *${res?.promessaPag.msg}*  \n\n Mais ainda voce pode deixa mensagem solicitando um atendente vai verificar se é possivel  `;
            }
            return [msg];
          })
          .catch((error) => {
            console.log(error);
          });
        return c;
      } else if (b[3] == ' Cancelado') {
        return ['contrato Cancelado'];
      } else if (b[3].trim() == 'Inativo') {
        return [
          'contrato Inativo \n\n Um atendente vai entra em contato com voce em instantes',
        ];
      }
    } else {
      const d = getreltString(await a);
      console.log('d   \n\n\n', d);
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

export default stage_30;
