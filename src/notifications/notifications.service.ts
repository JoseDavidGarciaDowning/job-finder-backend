import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as schema from '../drizzle/schema/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { deviceTokens } from './entities/device-token.entity';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { eq } from 'drizzle-orm';

@Injectable()
  export class NotificationsService implements OnModuleInit {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  onModuleInit() {
    try {
      this.logger.log('Initializing Firebase Admin SDK...');
      const serviceAccountJson = this.configService.get<string>(
        'FIREBASE_SERVICE_ACCOUNT_CREDENTIALS',
      );

      if (!serviceAccountJson) {
        throw new Error(
          'FIREBASE_SERVICE_ACCOUNT_CREDENTIALS environment variable not found.',
        );
      }

      const serviceAccount: ServiceAccount = JSON.parse(serviceAccountJson);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      this.logger.log('Firebase Admin SDK initialized successfully.');
    } catch (error) {
      this.logger.error('Failed to initialize Firebase Admin SDK:', error);
    }
  }

  async registerDevice(userId: string, token: string) {
    try {
      this.logger.log(`Registering device token for user ${userId}`);
      await this.db
        .insert(deviceTokens)
        .values({ userId, token })
        .onConflictDoUpdate({
          target: deviceTokens.token,
          set: { userId },
        });

      return { success: true, message: 'Device registered successfully' };
    } catch (error) {
      this.logger.error(
        `Failed to register device for user ${userId}`,
        error.stack,
      );
      throw new Error('Could not register device token');
    }
  }

  async sendNotificationToUser(
    userId: string,
    payload: { title: string; body: string; data?: { [key: string]: string } },
  ) {
    this.logger.log(`Sending notification to user ${userId}`);

    const tokens = await this.db
      .select({ token: deviceTokens.token })
      .from(deviceTokens)
      .where(eq(deviceTokens.userId, userId));

    if (tokens.length === 0) {
      this.logger.warn(`No device tokens found for user ${userId}`);
      return { success: false, message: 'No devices found for user' };
    }

    const tokenValues = tokens.map((t) => t.token);

    const message = {
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: payload.data || {},
      tokens: tokenValues,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      this.logger.log(
        `Successfully sent message: ${response.successCount} of ${tokenValues.length}`,
      );

      if (response.failureCount > 0) {
        const failedTokens: string[] = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokenValues[idx]);
          }
        });
        this.logger.warn(
          `List of tokens that caused failures: ${failedTokens.join(', ')}`,
        );
        
      }

      return { success: true, response };
    } catch (error) {
      this.logger.error('Error sending message:', error);
      throw new Error('Could not send notification');
    }
  }
}
