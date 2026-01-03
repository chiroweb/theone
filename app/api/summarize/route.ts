import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
    try {
        const { title, content, source, country } = await request.json();

        const message = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620", // Using a valid model name
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: `당신은 비즈니스 뉴스 분석가입니다. 한국 사업가 관점에서 분석해주세요.

뉴스 정보:
- 출처: ${source} (${country})
- 제목: ${title}
- 본문: ${content}

다음 형식으로 JSON 응답해주세요:
{
  "summary": ["요약 1번", "요약 2번", "요약 3번"],
  "action_idea": "실행 아이디어 한 문장",
  "kr_check": {
    "similar_service": "국내 유사 서비스 존재 여부",
    "regulation": "관련 규제 이슈",
    "barrier": "예상 진입 장벽 (낮음/중간/높음)"
  }
}

JSON만 응답하세요. 다른 텍스트 없이.`
                }
            ],
        });

        // Extract text content safely
        const responseText = message.content[0].type === 'text'
            ? message.content[0].text
            : '{}';

        const analysis = JSON.parse(responseText);

        return Response.json(analysis);
    } catch (error) {
        console.error('Error in summarize API:', error);
        return Response.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
