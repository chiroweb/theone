import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic'; // Ensure this route is not cached

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || 'dummy-key',
});

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
);

const parser = new Parser();

export async function GET() {
    try {
        const feeds = [
            { url: 'https://techcrunch.com/feed/', source: 'TechCrunch', country: 'US' },
            { url: 'https://venturebeat.com/feed/', source: 'VentureBeat', country: 'US' },
            { url: 'https://asia.nikkei.com/rss/feed/nar', source: 'Nikkei Asia', country: 'JP' },
            { url: 'https://platum.kr/feed', source: 'Platum', country: 'KR' },
            { url: 'https://finance.yahoo.com/news/rssindex', source: 'Yahoo Finance', country: 'Global' },
        ];

        const results = [];
        const errors = [];

        for (const feedInfo of feeds) {
            try {
                const feed = await parser.parseURL(feedInfo.url);
                // Limit to latest 2 items per feed to manage costs/rate limits (Total ~10 items/run)
                const latestItems = feed.items.slice(0, 2);

                for (const item of latestItems) {
                    if (!item.link || !item.title) continue;

                    // Check if already exists
                    const { data: existing } = await supabase
                        .from('insights')
                        .select('id')
                        .eq('original_url', item.link)
                        .single();

                    if (existing) {
                        results.push({ title: item.title, status: 'skipped (exists)' });
                        continue;
                    }

                    // 2. Summarize with Claude (Expert Persona)
                    try {
                        const message = await anthropic.messages.create({
                            model: "claude-3-5-sonnet-20240620",
                            max_tokens: 1024,
                            messages: [
                                {
                                    role: "user",
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

JSON만 응답하세요.`
                                }
                            ],
                        });

                        const responseText = message.content[0].type === 'text'
                            ? message.content[0].text
                            : '{}';

                        let analysis;
                        try {
                            analysis = JSON.parse(responseText);
                        } catch (e) {
                            console.error("Failed to parse JSON for item:", item.title);
                            errors.push({ source: feedInfo.source, title: item.title, error: 'JSON Parse Error' });
                            continue;
                        }

                        // 3. Save to Supabase
                        const { error } = await supabase.from('insights').insert({
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
                            console.error("Supabase Insert Error:", error);
                            errors.push({ source: feedInfo.source, title: item.title, error: `Supabase Error: ${error.message}` });
                        } else {
                            results.push({ title: item.title, status: 'saved' });
                        }
                    } catch (aiError: any) {
                        console.error("AI Error:", aiError);
                        errors.push({ source: feedInfo.source, title: item.title, error: `AI Error: ${aiError.message}` });
                    }
                }
            } catch (feedError: any) {
                console.error(`Failed to fetch feed ${feedInfo.source}:`, feedError);
                errors.push({ source: feedInfo.source, error: `Feed Fetch Error: ${feedError.message}` });
            }
        }

        return Response.json({ success: true, processed: results, errors: errors });
    } catch (error) {
        console.error('Cron Job Error:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
