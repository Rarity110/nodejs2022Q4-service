import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class User {
  @ApiProperty({
    example: '2b01523b-81b2-44dd-bed3-843e868a41bd',
    description: 'ID',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Rarity',
    description: 'Login',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 1,
    description: 'Version',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  version: string;
}
