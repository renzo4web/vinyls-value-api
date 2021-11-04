import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  album: string;

  @Expose()
  artist: string;

  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  condition: string;

  @Expose()
  year: number;

  @Transform(({ obj }) => (obj.user ? obj.user.id : obj.userId))
  //@Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
