import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}

  async create(reportDto: CreateReportDto, user: User): Promise<Report> {
    //
    // TODO: connect to discog for additional info
    const report = this.reportsRepository.create(reportDto);
    report.user = user;
    return await this.reportsRepository.save(report);
  }

  async findById(id: number): Promise<Report> {
    const report = await this.reportsRepository.findOne({ id });

    if (!report) {
      throw new NotFoundException('report not found');
    }

    return report;
  }

  async changeApproval(id: number, isApproved: boolean): Promise<Report> {
    const report = await this.findById(id);
    report.approved = isApproved;
    return await this.reportsRepository.save(report);
  }

  async find(): Promise<Report[]> {
    return await this.reportsRepository.find();
  }
}
