import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
