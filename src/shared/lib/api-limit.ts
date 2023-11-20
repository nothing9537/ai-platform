import { auth } from '@clerk/nextjs';

import { MAX_FREE_API_CALL_COUNT } from '../consts/api-limit';
import { db } from './db';

// export const increaseAPILimit = async () => {
//   const { userId } = auth();

//   if (!userId) {
//     return;
//   }

//   const userAPILimit = await db.userAPILimit.findUnique({
//     where: { userId },
//   });

//   if (userAPILimit) {
//     await db.userAPILimit.update({
//       where: { userId },
//       data: {
//         count: userAPILimit.count + 1,
//       },
//     });
//   } else {
//     await db.userAPILimit.create({
//       data: {
//         userId,
//         count: 1,
//       },
//     });
//   }
// };

// export const checkAPILimit = async () => {
//   const { userId } = auth();

//   if (!userId) {
//     return false;
//   }

//   const userAPILimit = await db.userAPILimit.findUnique({
//     where: { userId },
//   });

//   if (!userAPILimit || userAPILimit.count < MAX_FREE_API_CALL_COUNT) {
//     return true;
//   }

//   return false;
// };

// export const

class APILimit {
  public async checkAPILimit(): Promise<boolean> {
    const { userId } = auth();

    if (!userId) {
      return false;
    }

    const userAPILimit = await db.userAPILimit.findUnique({
      where: { userId },
    });

    if (!userAPILimit || userAPILimit.count < MAX_FREE_API_CALL_COUNT) {
      return true;
    }

    return false;
  }

  public async increaseAPILimit(): Promise<void> {
    const { userId } = auth();

    if (!userId) {
      return;
    }

    const userAPILimit = await db.userAPILimit.findUnique({
      where: { userId },
    });

    if (userAPILimit) {
      await db.userAPILimit.update({
        where: { userId },
        data: {
          count: userAPILimit.count + 1,
        },
      });
    } else {
      await db.userAPILimit.create({
        data: {
          userId,
          count: 1,
        },
      });
    }
  }

  public async getAPILimitCount(): Promise<number> {
    const { userId } = auth();

    if (!userId) {
      return 0;
    }

    const userAPILimit = await db.userAPILimit.findUnique({
      where: { userId },
    });

    if (!userAPILimit) {
      return 0;
    }

    return userAPILimit.count;
  }
}

export default new APILimit();
