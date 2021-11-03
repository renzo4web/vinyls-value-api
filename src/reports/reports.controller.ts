import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createReport(
    @Body() createReport: CreateReportDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return await this.reportsService.create(createReport, user);
  }
}
