import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, AuthModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
