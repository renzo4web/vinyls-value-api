import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  album: string;

  @Column()
  artist: string;

  @Column()
  price: number;

  @Column()
  condition: string; // EXCELLENT,GOOD,MEDIUM,BAD // @Contains class validator

  @Column()
  year: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
