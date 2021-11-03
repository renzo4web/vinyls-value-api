import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Report } from 'src/reports/entities/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
