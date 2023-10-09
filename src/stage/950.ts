import WAWebJS from 'whatsapp-web.js';
import DBUser, { cUser } from '../db/user';
import stage_0 from './0';

class stage_950 {
  private dbuser = new DBUser();
  private Stage_0 = new stage_0();
  async execute(message: WAWebJS.Message) {
    // const user: cUser = {
    //   id: undefined,
    //   from: message.from,
    //   notifyName: undefined,
    //   timestamp: message.timestamp,
    //   stg: 900,
    //   createdAt: undefined,
    //   expiresAt: message.timestamp + 7200 / 120,
    //   updatedAt: undefined,
    // };
    // this.dbuser.updatestage(user);
    //message.body = "ola"
    return await this.Stage_0.execute(message);
  }
}

export default stage_950;
