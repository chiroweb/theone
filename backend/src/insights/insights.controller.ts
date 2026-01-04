import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InsightsService } from './insights.service';
// import { AuthGuard } from '@nestjs/passport'; // Enable later

@Controller('insights')
export class InsightsController {
    constructor(private readonly insightsService: InsightsService) { }

    @Get()
    findAll() {
        return this.insightsService.findAll();
    }

    @Post('trigger')
    async triggerManualFetch() {
        await this.insightsService.fetchAndSummarizeNews();
        return { success: true, message: 'Manual fetch triggered' };
    }
}
