import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule'; // Assuming ScheduleModule is needed for Cron
import { Insight } from './entities/insight.entity';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Insight]),
    ScheduleModule,
    ConfigModule,
  ],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule { }
