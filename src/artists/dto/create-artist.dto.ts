import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    example: 'Artist1',
    description: 'Name',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'true',
    description: 'Grammy',
  })
  @IsBoolean()
  readonly grammy: boolean;
}
