import { forwardRef, Module } from '@nestjs/common';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [forwardRef(() => FavoritesModule), forwardRef(() => TrackModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
