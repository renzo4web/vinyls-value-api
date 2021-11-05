import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';

export class getEstimatePriceDto {
  @ApiProperty()
  @IsString()
  artist: string;

  @ApiProperty()
  @IsString()
  album: string;

  @ApiProperty()
  @IsEnum(['EXCELLENT', 'GOOD', 'MEDIUM', 'BAD'])
  condition: string;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1930)
  @Max(2021)
  @IsNumber()
  year: number;
}
