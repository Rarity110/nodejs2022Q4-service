import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { Favorite } from './interfaces/favoritesModel';

@ApiTags('favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All favorites are received.',
    type: [Favorite],
  })
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The track has been successfully added.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track does not exist.',
  })
  addFavoriteTrack(@Param('id') id: string) {
    return this.favoritesService.addFavoriteTrack(id);
  }

  @Delete('track/:id')
  // @Delete('track/:id')
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The track has been successfully deleted from favorites.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track is not favorite.',
  })
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.deleteFavoriteTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The album has been successfully added.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album does not exist.',
  })
  addFavoriteAlbum(@Param('id') id: string) {
    return this.favoritesService.addFavoriteAlbum(id);
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The album has been successfully deleted from favorites.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album is not favorite.',
  })
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.deleteFavoriteAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The artist has been successfully added.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist does not exist.',
  })
  addFavoriteArtist(@Param('id') id: string) {
    return this.favoritesService.addFavoriteArtist(id);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The artist has been successfully deleted from favorites.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist is not favorite.',
  })
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.deleteFavoriteArtist(id);
  }
}
