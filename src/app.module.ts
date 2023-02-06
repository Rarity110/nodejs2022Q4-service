import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistsModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
