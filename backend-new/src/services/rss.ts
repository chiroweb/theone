import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'THE1PERCENT-Bot/1.0',
  },
});

// ============================================
// RSS 피드 소스 목록
// ============================================
export const RSS_FEEDS = [
  // 글로벌
  { url: 'https://techcrunch.com/feed/', source: 'TechCrunch', country: 'Global' },
  { url: 'https://venturebeat.com/feed/', source: 'VentureBeat', country: 'Global' },
  { url: 'https://www.wired.com/feed/rss', source: 'WIRED', country: 'Global' },
  { url: 'https://www.forbes.com/business/feed/', source: 'Forbes', country: 'Global' },

  // 한국
  { url: 'https://platum.kr/feed', source: 'Platum', country: 'KR' },
  { url: 'https://byline.network/feed/', source: 'Byline Network', country: 'KR' },

  // 스타트업/VC
  { url: 'https://news.ycombinator.com/rss', source: 'Hacker News', country: 'Global' },
  { url: 'https://www.producthunt.com/feed', source: 'Product Hunt', country: 'Global' },
];

// ============================================
// 단일 피드 가져오기
// ============================================
export async function fetchFeed(feedInfo: typeof RSS_FEEDS[0]) {
  try {
    const feed = await parser.parseURL(feedInfo.url);

    return feed.items.slice(0, 5).map(item => ({
      title: item.title || '',
      content: item.contentSnippet || item.content || '',
      link: item.link || '',
      pubDate: item.pubDate || item.isoDate || '',
      source: feedInfo.source,
      country: feedInfo.country,
    }));
  } catch (error) {
    console.error(`Failed to fetch ${feedInfo.source}:`, error);
    return [];
  }
}

// ============================================
// 모든 피드 가져오기
// ============================================
export async function fetchAllFeeds() {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(feed => fetchFeed(feed))
  );

  const allItems: Array<{
    title: string;
    content: string;
    link: string;
    pubDate: string;
    source: string;
    country: string;
  }> = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    } else {
      console.error(`Feed ${RSS_FEEDS[index].source} failed:`, result.reason);
    }
  });

  return allItems;
}

// ============================================
// 특정 카테고리 피드만 가져오기
// ============================================
export async function fetchFeedsByCountry(country: string) {
  const feeds = RSS_FEEDS.filter(f => f.country === country);
  const results = await Promise.allSettled(feeds.map(feed => fetchFeed(feed)));

  const allItems: Array<{
    title: string;
    content: string;
    link: string;
    pubDate: string;
    source: string;
    country: string;
  }> = [];

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    }
  });

  return allItems;
}
