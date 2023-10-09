import { Router } from 'express';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import Sender from '../whats/classSender';
import tempMSG, { MSG_TYPE, MSGS } from '../stage/msg';

const routerSender = Router();
routerSender.get('/msg', async (req, res) => {
  const whatsSender = new Sender();
  const { query } = req;
  const { msg, to, token, remetente } = query;
  console.log(token, msg, to, remetente);
  if (token == process.env.SGPTOKEN && remetente == 'SGPWHATSENDER') {
    let numero = to as string;
    numero = numero.replace(/\D/g, '');

    const digitosFinais = numero.substring(numero.length - 8, numero.length);
    const DDD = numero.substring(2, 4);
    console.log('numero  ', numero);
    console.log('numeroSemNonoDigito  ', digitosFinais);
    console.log('numeroDDD  ', DDD);
    console.log('numerointeiro', DDD + digitosFinais);
    const numeroSemNonoDigito: string = DDD + digitosFinais;
    if (!isValidPhoneNumber(numeroSemNonoDigito, 'BR')) {
      return res
        .status(400)
        .json({ ok: false, msg: 'Numero NÃO VALIDO', Numero: to });
    } else {
      const stageIndex = tempMSG.stage.findIndex(
        (element) => element.id === 9000
      );

      const tmp1 = msg as string;

      const palavra = tempMSG.stage[stageIndex].MSGs[0].msg[0].value;

      const tmp = tmp1.split(palavra);
      const ArrayMSG: MSGS = {
        msg: [{ type: MSG_TYPE.text, value: 'aaa' }],
        apikey: token as string,
      };
      ArrayMSG.msg.shift();
      for (let index = 0; index < tmp.length; index++) {
        ArrayMSG.msg.push({ type: MSG_TYPE.send_msg, value: tmp[index] });
      }
      // console.log('tmp', tmp);
      // console.log(ArrayMSG);

      let phoneNumber = parsePhoneNumber(numeroSemNonoDigito, 'BR')
        ?.format('E.164')
        ?.replace('+', '') as string;
      // phoneNumber = phoneNumber.includes('@c.us')
      //   ? phoneNumber
      //   : `${phoneNumber}@c.us`;

      whatsSender
        .SendMSG(ArrayMSG, phoneNumber, tempMSG.stage[stageIndex].delay)
        .then(() => {
          return res.status(200).json({ ok: true, text: msg, to: to });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ ok: false, text: msg, to: to });
        });
    }
  }
  //return res.status(400).json({ ok: false, text: msg, to: to });
});
export default routerSender;
