import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  condition: string; // EXCELLENT,GOOD,MEDIUM,BAD // @Contains class validator

  @Column()
  year: number;
}
