import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';

@Injectable()
export class InsightsService {
    private readonly logger = new Logger(InsightsService.name);
    private supabase: SupabaseClient;
    private anthropic: Anthropic;
    private parser: Parser;

    constructor(private configService: ConfigService) {
        this.supabase = createClient(
            this.configService.get<string>('SUPABASE_URL') || '',
            this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') || '',
        );
        this.anthropic = new Anthropic({
            apiKey: this.configService.get<string>('ANTHROPIC_API_KEY') || '',
        });
        this.parser = new Parser();
    }

    // Run at 06:00 KST (21:00 UTC previous day)
    @Cron('0 21 * * *')
    async handleCronMorning() {
        this.logger.log('Running Morning News Fetch (06:00 KST)');
        await this.fetchAndSummarizeNews();
    }

    // Run at 19:30 KST (10:30 UTC)
    @Cron('30 10 * * *')
    async handleCronEvening() {
        this.logger.log('Running Evening News Fetch (19:30 KST)');
        await this.fetchAndSummarizeNews();
    }

    async fetchAndSummarizeNews() {
        const feeds = [
            { url: 'https://techcrunch.com/feed/', source: 'TechCrunch', country: 'US' },
            { url: 'https://venturebeat.com/feed/', source: 'VentureBeat', country: 'US' },
            { url: 'https://asia.nikkei.com/rss/feed/nar', source: 'Nikkei Asia', country: 'JP' },
            { url: 'https://platum.kr/feed', source: 'Platum', country: 'KR' },
            { url: 'https://finance.yahoo.com/news/rssindex', source: 'Yahoo Finance', country: 'Global' },
        ];

        for (const feedInfo of feeds) {
            try {
                const feed = await this.parser.parseURL(feedInfo.url);
                const latestItems = feed.items.slice(0, 2);

                for (const item of latestItems) {
                    if (!item.link || !item.title) continue;

                    const { data: existing } = await this.supabase
                        .from('insights')
                        .select('id')
                        .eq('original_url', item.link)
                        .single();

                    if (existing) {
                        this.logger.debug(`Skipping existing item: ${item.title}`);
                        continue;
                    }

                    this.logger.log(`Processing new item: ${item.title}`);
                    const analysis = await this.analyzeWithClaude(item, feedInfo);

                    if (analysis) {
                        await this.saveInsight(item, feedInfo, analysis);
                    }
                }
            } catch (error) {
                this.logger.error(`Failed to process feed ${feedInfo.source}`, error);
            }
        }
    }

    private async analyzeWithClaude(item: any, feedInfo: any) {
        try {
            const message = await this.anthropic.messages.create({
                model: 'claude-3-5-sonnet-20240620',
                max_tokens: 1024,
                messages: [
                    {
                        role: 'user',
                        content: `당신은 객관적이고 냉철한 비즈니스 분석가입니다. 
감정을 배제하고, 사실과 데이터에 기반하여 한국 사업가에게 실질적인 도움이 되는 정보를 제공하세요.
전문적인 용어를 적절히 사용하되, 명확하고 간결하게 작성하십시오.

뉴스 정보:
- 출처: ${feedInfo.source} (${feedInfo.country})
- 제목: ${item.title}
- 본문: ${item.contentSnippet || item.content || ''}

다음 형식으로 JSON 응답해주세요:
{
  "summary": ["핵심 사실 1", "핵심 사실 2", "핵심 사실 3"],
  "action_idea": "한국 사업가가 취해야 할 구체적인 행동 제언 (1문장)",
  "kr_check": {
    "similar_service": "국내 유사 사례/서비스 (없으면 '없음')",
    "regulation": "관련 규제/법적 이슈 (핵심만)",
    "barrier": "진입 장벽 (낮음/중간/높음) 및 이유"
  }
}

JSON만 응답하세요.`,
                    },
                ],
            });

            const responseText =
                message.content[0].type === 'text' ? message.content[0].text : '{}';
            return JSON.parse(responseText);
        } catch (error) {
            this.logger.error(`AI Analysis failed for ${item.title}`, error);
            return null;
        }
    }

    private async saveInsight(item: any, feedInfo: any, analysis: any) {
        const { error } = await this.supabase.from('insights').insert({
            source: feedInfo.source,
            country: feedInfo.country,
            original_url: item.link,
            original_title: item.title,
            ai_summary: analysis.summary?.join('\n') || '',
            action_idea: analysis.action_idea || '',
            kr_check_similar: analysis.kr_check?.similar_service || '',
            kr_check_regulation: analysis.kr_check?.regulation || '',
            kr_check_barrier: analysis.kr_check?.barrier || '',
            created_at: new Date().toISOString(),
        });

        if (error) {
            this.logger.error(`Supabase Insert Error: ${error.message}`);
        } else {
            this.logger.log(`Saved insight: ${item.title}`);
        }
    }

    async findAll() {
        const { data, error } = await this.supabase
            .from('insights')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }
}
