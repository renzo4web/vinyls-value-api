import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  artist: string;

  @ApiProperty()
  @IsString()
  album: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @ApiProperty()
  @IsEnum(['EXCELLENT', 'GOOD', 'MEDIUM', 'BAD'])
  condition: string;

  @ApiProperty()
  @IsNumber()
  @Min(1930)
  @Max(2021)
  year: number;
}
