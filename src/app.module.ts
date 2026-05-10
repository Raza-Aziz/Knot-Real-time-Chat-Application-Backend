import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, UsersModule, ChatModule, ConversationsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
