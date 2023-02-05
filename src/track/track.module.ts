import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistsModule } from 'src/artists/artists.module';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  // imports: [
  //   forwardRef(() => ArtistsModule),
  //   forwardRef(() => AlbumService),
  //   forwardRef(() => FavoritesService),
  // ],
  exports: [TrackService],
})
export class TrackModule {}
