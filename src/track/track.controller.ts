import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackCreatedResponse } from './interfaces/trackCreatedResponse';
import { Track } from './interfaces/trackModel';
import { TrackService } from './track.service';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All tracks are received.',
    type: [Track],
  })
  getTracks() {
    return this.trackService.getTracks();
    // Server should answer with status code 200 and all tracks records
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The track has been successfully received.',
    type: Track,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track does not exist.',
  })
  getTrack(@Param('id') id: string) {
    return this.trackService.getTrack(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The track has been successfully created.',
    type: Track,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Track login already exists.',
  })
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    const newTrack = this.trackService.createTrack(createTrackDto);
    const response: ITrackCreatedResponse = {
      id: newTrack.id,
      name: newTrack.name,
      artistId: newTrack.artistId,
      albumId: newTrack.albumId,
      duration: newTrack.duration,
    };
    return response;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The track has been successfully updated.',
    type: Track,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track does not exist.',
  })
  UpdateTrackPassword(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id') id: string,
  ) {
    return this.trackService.updateTrack(updateTrackDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The track has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track does not exist.',
  })
  removeTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
