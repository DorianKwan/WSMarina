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
    this.theWallStreetJournal = this.theWallStreetJournal.bind(this);
    this.theEconomist = this.theEconomist.bind(this);
    this.businessInsider = this.businessInsider.bind(this);
    this.bloomberg = this.bloomberg.bind(this);
  }

  componentDidMount() {
    this.postArticles("api/newsapi/bloomberg");
    setInterval(this.postArticles(), 1800000);
  } 

  postArticles(url) {
    fetch(url)
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

        const source = articles[0].source.split("-").map((word) => { return word[0].toUpperCase() + word.substr(1, word.length) }).join(" ");

        this.setState({
          articles,
          source,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  bloomberg(event) {
    event.preventDefault();
    this.postArticles('/api/newsapi/bloomberg');
  }

  theWallStreetJournal(event) {
    event.preventDefault();
    this.postArticles('/api/newsapi/thewallstreetjournal');
  }

  theEconomist(event) {
    event.preventDefault();
    this.postArticles('/api/newsapi/theeconomist');
  }

  businessInsider(event) {
    event.preventDefault();
    this.postArticles('/api/newsapi/businessinsider');
  }


  render() {
    const source = this.state.articles ? this.state.source : "Source";
    const articles = this.state.articles.map(article => {
      return (
        <div className="each-article" key={ article.title }>
          <div className="article-content">
            <a className="article-title" href={ article.url }>{ article.title }</a> 
            <br />
            <span className="article-author">Written by: { article.author }</span>
            <p className="article-description">{ article.description }</p>
          </div>
          <div className="article-image">
            <a href={ article.url }>
              <img src={ article.image } alt="Click for Full Article" />
            </a>
          </div>
        </div>
      );
    });

    return (
      <div>
        <span style={{ paddingBottom: "25px" }}>
          <menu className="news-dropdown">
            <ul>
              <li><span>{ source }</span>
                <ul>
                    <li><input type="submit" onClick={this.bloomberg} value="Bloomberg News" /></li>
                    <li><input type="submit" onClick={this.theWallStreetJournal} value="The Wall Street Journal News" /></li>
                    <li><input type="submit" onClick={this.theEconomist} value="The Economist News" /></li>
                    <li><input type="submit" onClick={this.businessInsider} value="Business Insider News" /></li>
                </ul>
              </li>
            </ul>
          </menu>
        </span> 
        <section className="news">
          { articles }
        </section>
      </div>
    );
  }
}

export default News;
