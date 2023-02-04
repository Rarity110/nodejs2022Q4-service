import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  @ApiProperty({
    example: '1',
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
}
