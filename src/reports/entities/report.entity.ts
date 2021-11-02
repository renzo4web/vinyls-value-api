import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
