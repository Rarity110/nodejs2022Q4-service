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

import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistCreatedResponse } from './interfaces.ts/artistCreatedResponse';
import { Artist } from './interfaces.ts/artistModel';

@ApiTags('artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All artists are received.',
    type: [Artist],
  })
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The artist has been successfully received.',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist does not exist.',
  })
  getArtist(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The artist has been successfully created.',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Artist login already exists.',
  })
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    const newArtist = this.artistService.createArtist(createArtistDto);
    const response: IArtistCreatedResponse = {
      id: newArtist.id,
      name: newArtist.name,
      grammy: newArtist.grammy,
    };
    return response;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The artist has been successfully updated.',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist does not exist.',
  })
  UpdateArtistPassword(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id') id: string,
  ) {
    return this.artistService.updateArtist(updateArtistDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The artist has been successfully deleted.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist does not exist.',
  })
  removeArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
