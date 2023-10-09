import { PrismaClient, User } from '@prisma/client';
//import { hash } from 'bcryptjs';

export interface cUser {
  id: number | undefined;
  from: string;
  notifyName: string | undefined;
  timestamp: number | undefined;
  stg: number | undefined;
  createdAt: Date | undefined;
  expiresAt: number | undefined | null;
  updatedAt: Date | undefined;
}

class dbUser {
  private prisma = new PrismaClient();

  // constructor() {
  //   this.init();
  // }
  // // eslint-disable-next-line @typescript-eslint/no-empty-function
  // private async init() {}

  async create(user: cUser) {
    if (user.from != null) {
      // user.password = await hash(user.password, 8);

      await this.prisma.user
        .create({
          data: user,
        })
        .then(async () => {
          await this.prisma.$disconnect();
        })
        .catch(async (e) => {
          console.error(e);
          await this.prisma.$disconnect();
          process.exit(1);
        })
        .finally(async () => {
          await this.prisma.$disconnect();
          process.exit(1);
        });
    }
  }

  async delete(user: User) {
    await this.prisma.user.delete({
      where: { from: user.from },
    });
  }

  async findall() {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        from: true,
        notifyName: true,
        stg: true,
        expiresAt: true,
      },
    });
    return allUsers;
  }

  async find(from: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        from: from,
      },
    });
    return user;
  }

  async updatestage(user: cUser) {
    const finduser = await this.prisma.user.findUnique({
      where: {
        from: user.from,
      },
    });
    if (finduser != null) {
      finduser.stg = user.stg as number;
      finduser.timestamp = user.timestamp as number;
      finduser.expiresAt = user.expiresAt as number;

      const updateUser = await this.prisma.user.update({
        where: {
          id: finduser.id,
        },
        data: finduser,
      });
      return updateUser;
    }
  }

  // async updatekey(user: User) {
  //   user.id = +user.id;
  //   const finduser = await this.prisma.user.findUnique({
  //     where: {
  //       id: +user.id,
  //     },
  //   });
  //   if (finduser != null && user.password != null) {
  //     finduser.id = +finduser.id;
  //     user.password = await hash(user.password, 8);
  //     const updateUser = await this.prisma.user.update({
  //       where: {
  //         id: finduser.id,
  //       },
  //       data: user,
  //     });
  //     return updateUser;
  //   }
  // }
}
export default dbUser;
