const axios = require('axios');
import { xml } from './xml';

export default function RssFeed() {
    const instance = {};

    const config = {
        selectors: {
            rssFeed: '.js-rss-feed',
        },
        maxItems: 3,
    };

    const formatDate = date => {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const day = newDate.getDate();
        let month = newDate.getMonth() + 1;

        if (month < 10) {
            month = `0${month}`;
        }

        return `${day}.${month}.${year}`;
    }

    const createElements = xmlDoc => {
        const rssFeedContainer = document.querySelector(config.selectors.rssFeed);
        const titles = xmlDoc.getElementsByTagName('title');
        const pubDates = xmlDoc.getElementsByTagName('pubDate');
        const links = xmlDoc.getElementsByTagName('link');  

        for (let i = 0; i < config.maxItems; i++) {
            const title = titles[i].childNodes[0].nodeValue;
            const pubDate = pubDates[i].childNodes[0].nodeValue;
            const link = links[i].childNodes[0].nodeValue;
            const news = document.createElement('a');
            const newsTitle = document.createElement('h3');
            const newsDate = document.createElement('div');

            news.href = link;
            news.target = '_blank';
            news.classList.add('grid__item', 'rss-feed-grid__item');
            newsTitle.innerText = title;
            newsTitle.classList.add('item__title');
            newsDate.innerText = formatDate(pubDate);
            newsDate.classList.add('item__date');
            news.append(newsDate, newsTitle);
            rssFeedContainer.append(news);
        }
    };

    const init = () => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'text/xml');

        createElements(xmlDoc);
    };

    init();
};
