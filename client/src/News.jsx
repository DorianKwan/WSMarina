import React from 'react';

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
