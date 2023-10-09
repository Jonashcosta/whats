import WAWebJS from 'whatsapp-web.js';
import config from '../config/config';
import util from '../util';
import DBUser, { cUser } from '../db/user';
import tempMSG, { msg, MSGS, MSG_TYPE } from './msg';
import { ResultMSG } from '../whats/sender';

class stage_0 {
  private dbuser = new DBUser();
  private util = new util();

  async execute(message: WAWebJS.Message): Promise<ResultMSG> {
    const user: cUser = {
      id: undefined,
      from: message.from,
      notifyName: undefined,
      timestamp: message.timestamp,
      stg: 1,
      createdAt: undefined,
      expiresAt: message.timestamp + config.expiresAt,
      updatedAt: undefined,
    };
    this.dbuser.updatestage(user);
    const stageIndex = tempMSG.stage.findIndex((element) => element.id === 0);
    const qtdMSG = tempMSG.stage[stageIndex].MSGs.length;
    const resp =
      tempMSG.stage[stageIndex].MSGs[
        this.util.randomIntFromInterval(0, qtdMSG)
      ];
    const s: MSGS = {
      msg: [resp.msg[0]],
      apikey: process.env.TOKENEVO as string,
    };
    const stageIndexMGSs = tempMSG.stage.findIndex(
      (element) => element.id === 1
    );
    const Array_MSGS = tempMSG.stage[stageIndexMGSs].MSGs;

    for (let index = 0; index < Array_MSGS.length; index++) {
      const element = Array_MSGS[index];
      s.msg.push(element.msg[1]);
    }

    return { ArrayMSG: s, delay: tempMSG.stage[stageIndex].delay };
  }
}

export default stage_0;
