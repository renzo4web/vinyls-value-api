import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  album: string;

  @Expose()
  artist: string;

  @Expose()
  price: number;

  @Expose()
  condition: string;

  @Expose()
  year: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
