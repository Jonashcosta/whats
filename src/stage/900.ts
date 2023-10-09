import WAWebJS from 'whatsapp-web.js';
import DBUser, { cUser } from '../db/user';

class stage_900 {
  private dbuser = new DBUser();
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
    return [''];
  }
}

export default stage_900;
