import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
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

  @Get()
  async getReports(): Promise<Report[]> {
    return await this.reportsService.find();
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async approveReport(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ApproveReportDto,
  ): Promise<Report> {
    return await this.reportsService.changeApproval(id, body.approved);
  }
}
