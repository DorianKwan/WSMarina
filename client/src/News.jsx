import React from 'react';

function orderByTime(arr) {
  const modifiedArr = arr.map((article) => {
    const publishedAt = article.publishedAt;
    const year = publishedAt.slice(0, 10).split('-').join('');
    const time = publishedAt.slice(12, 20).split(':').join('');
    article.publishedAt = year + time;
    return article;
  });
  modifiedArr.sort((a, b) => {
    return b - a;
  });
  return modifiedArr;
}

class News extends React.Component {

  postArticles() {
    console.log('filled with hatred');
    const newsApiKey = 'Your newsapi key here';
    fetch(`https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=${newsApiKey}`)
      .then((resp) => resp.json())
      .then(news => {
        const articlesList = news.articles;
        const source = news.source;
        const articles = articlesList.map(article => {
          const title = article.title;
          const author = article.author;
          const description = article.description;
          const url = article.url;
          const image = article.urlToImage;
          const publishedAt = article.publishedAt;
          return {
            title,
            author,
            description,
            url,
            image,
            publishedAt,
            source
          };
        });
        return articles;
      })
      .then((articles) => {
        return orderByTime(articles);
      })
      .then((articles) => {
        this.setState({
          articles
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <section className="news"></section>
    );
  }
}

export default News;
