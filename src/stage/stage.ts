// import banco from "../db/banco";
// import tableUser from "../db/tableUser";
import stage_0 from './0';
import stage_1 from './1';
import stage_2 from './2';
import stage_3 from './3';
import stage_4 from './4';
import stage_6 from './6';
import stage_20 from './20';
import stage_30 from './30';
import stage_40 from './40';
import stage_900 from './900';
import stage_950 from './950';
import DBUser from '../db/user';
import WAWebJS from 'whatsapp-web.js';
import config from '../config/config';
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
class stage {
  private dbuser = new DBUser();
  private Stage_0 = new stage_0();
  private Stage_1 = new stage_1();
  private Stage_2 = new stage_2();
  private Stage_3 = new stage_3();
  private Stage_4 = new stage_4();

  private Stage_6 = new stage_6();
  private Stage_20 = new stage_20();
  private Stage_30 = new stage_30();
  private Stage_40 = new stage_40();
  private Stage_900 = new stage_900();
  private Stage_950 = new stage_950();
  async getstage(
    message: WAWebJS.Message
  ): Promise<ResultMSG | string[] | undefined | void> {
    const chat = await this.dbuser.find(message.from);
    if (chat == null) {
      const user: cUser = {
        from: message.from,
        stg: 0,
        id: undefined,
        notifyName: undefined,
        timestamp: message.timestamp,
        expiresAt: message.timestamp + config.expiresAt,
        createdAt: undefined,
        updatedAt: undefined,
      };
      //console.log(Math.trunc(new Date().getTime() / 1000));
      this.dbuser
        .create(user)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch(async (e: any) => {
          console.error(e);
        });

      console.log(message.from, 'save');

      return await this.Stage_0.execute(message);
    } else {
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
      await this.dbuser.updatestage(user);

      console.log(chat.stg);
      if (message.type == 'chat') {
        switch (chat.stg) {
          case 0:
            return await this.Stage_0.execute(message);
          case 1:
            return await this.Stage_1.execute(message);
          case 2:
            return await this.Stage_2.execute(message);
          case 3:
            return await this.Stage_3.execute(message);
          case 4:
            return await this.Stage_4.execute(message);
          case 6:
            return await this.Stage_6.execute(message);
          case 20:
            return await this.Stage_20.execute(message);
          case 30:
            return await this.Stage_30.execute(message);
          case 40:
            return await this.Stage_40.execute(message);
          case 900:
            return await this.Stage_900.execute(message);
        }
      } else {
        return await this.Stage_950.execute(message);
      }
    }
  }
}

export default stage;
