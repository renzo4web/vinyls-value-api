import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  //@UseGuards(AuthGuard)
  async createReport(@Body() createReport: CreateReportDto): Promise<Report> {
    return await this.reportsService.create(createReport);
  }
}
