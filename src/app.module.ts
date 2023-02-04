import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UserModule, AuthModule, TrackModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
