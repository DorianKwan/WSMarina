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

  constructor() {
    super();
    this.state = {
      articles: []
    }
    this.postArticles = this.postArticles.bind(this);
  }

  componentDidMount() {
    this.postArticles();
    setInterval(this.postArticles(), 1800000);
  } 

  postArticles() {
    const newsApiKey = 'your newsapi key here';
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

    const articles = this.state.articles.map(article => {
      return (
        <div className="eachArticle" key={ article.title }>
          <a href={ article.url }>
            <img src={ article.image } alt="Click for Full Article" />
          </a>
          <a className="article-title" href={ article.url }>{ article.title }</a> 
          <p>{ article.description }</p>
          <span><small>Written by: { article.author }</small></span>
        </div>
      );
    });

    return (
      <section className="news">
        { articles }
      </section>
    );
  }
}

export default News;
