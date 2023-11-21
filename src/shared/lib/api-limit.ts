import { auth } from '@clerk/nextjs';

import { MAX_FREE_API_CALL_COUNT } from '../consts/api-limit';
import { db } from './db';
import { checkSubscription } from './subscription';

class APILimit {
  public async checkAPILimit(): Promise<boolean> {
    const { userId } = auth();
    const isPremium = await checkSubscription();

    if (!userId) {
      return false;
    }

    const userAPILimit = await db.userAPILimit.findUnique({
      where: { userId },
    });

    if (isPremium) return true;
    if (!userAPILimit) return true;
    if (userAPILimit.count < MAX_FREE_API_CALL_COUNT) return true;

    return false;
  }

  public async increaseAPILimit(): Promise<void> {
    const { userId } = auth();
    const isPremium = await checkSubscription();

    if (!userId) {
      return;
    }

    if (isPremium) {
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
