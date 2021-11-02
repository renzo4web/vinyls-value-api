import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}

  async create(reportDto: CreateReportDto): Promise<Report> {
    // TODO: connect to discog for additional info
    const report = this.reportsRepository.create(reportDto);

    return await this.reportsRepository.save(report);
  }
}
