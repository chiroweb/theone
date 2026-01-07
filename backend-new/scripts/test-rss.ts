
import Parser from 'rss-parser';

const parser = new Parser();
const FEED_URL = 'https://techcrunch.com/feed/';

async function testRSS() {
    console.log(`Testing connection to ${FEED_URL}...`);
    try {
        const feed = await parser.parseURL(FEED_URL);
        console.log(`✅ Success! Fetched ${feed.items.length} items.`);
        console.log(`latest title: ${feed.items[0].title}`);
        console.log("RSS Fetching is working correctly.");
    } catch (error) {
        console.error("❌ RSS Fetch Failed:", error);
    }
}

testRSS();
