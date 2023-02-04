import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateArtistDto {
  @ApiProperty({
    example: 'Artist2',
    description: 'Name',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'true',
    description: 'Grammy',
  })
  @IsBoolean()
  readonly grammy: boolean;
}
