import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumCreatedResponse } from './interfaces/albumCreatedResponse';
import { Album } from './interfaces/albumModel';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All albums are received.',
    type: [Album],
  })
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The album has been successfully received.',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album does not exist.',
  })
  getAlbum(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The album has been successfully created.',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Album login already exists.',
  })
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumService.createAlbum(createAlbumDto);
    const response: IAlbumCreatedResponse = {
      id: newAlbum.id,
      name: newAlbum.name,
      year: newAlbum.year,
      artistId: newAlbum.artistId,
    };
    return response;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The album has been successfully updated.',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album does not exist.',
  })
  UpdateAlbumPassword(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id') id: string,
  ) {
    return this.albumService.updateAlbum(updateAlbumDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The album has been successfully deleted.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album does not exist.',
  })
  removeAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
