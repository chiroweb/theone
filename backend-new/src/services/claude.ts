import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// ============================================
// 페르소나 설정
// ============================================
import { INSIGHT_ANALYST_PERSONA } from '../config/persona';

// ============================================
// 뉴스 분석 함수
// ============================================
export async function analyzeNews(item: {
  title: string;
  content: string;
  source: string;
  country: string;
}) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      system: INSIGHT_ANALYST_PERSONA,
      messages: [
        {
          role: 'user',
          content: `다음 뉴스를 분석해주세요.

## 뉴스 정보
- 출처: ${item.source} (${item.country})
- 제목: ${item.title}
- 본문: ${item.content}

## 응답 형식 (JSON)
{
  "summary": ["핵심 포인트 1", "핵심 포인트 2", "핵심 포인트 3"],
  "actionIdea": "한국 사업가가 당장 할 수 있는 구체적 행동 1가지",
  "krCheck": {
    "similarService": "국내 유사 서비스 또는 '국내 사례 없음'",
    "regulation": "관련 규제 이슈 핵심 또는 '특별한 규제 없음'",
    "barrier": "진입 장벽 수준과 이유 (예: '중간 - 초기 투자 비용 필요')"
  },
  "tags": ["관련", "키워드", "태그"]
}

JSON만 응답하세요.`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '{}';

    // JSON 파싱 시도
    const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Claude API Error:', error);
    return null;
  }
}

// ============================================
// 범용 AI 응답 함수
// ============================================
export async function askClaude(prompt: string, systemPrompt?: string) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt || '당신은 THE 1% 커뮤니티의 도움이 되는 AI 어시스턴트입니다.',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  } catch (error) {
    console.error('Claude API Error:', error);
    return null;
  }
}
