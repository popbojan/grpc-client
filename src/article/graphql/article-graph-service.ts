import {Injectable} from '@nestjs/common';
import fetcher from 'isomorphic-fetch';
import gql from 'graphql-tag';
import ApolloClient, {ApolloQueryResult} from 'apollo-boost';
import {IArticle} from '../../codegen';

@Injectable()
export class ArticleGraphService {

  async getArticle(id: string) {
    const result: ApolloQueryResult<any> = await client.query({
      query: gql`
        query {
           getArticleByArticleId(articleId: "${id}") {
             id
             bodyText
             articleType
           }
        }
      `,
    });
    return result.data;
  }

  async getArticles() {
    const result: ApolloQueryResult<any> = await client.query({
      query: gql`
        query{
          getArticles {
            articles {
              id
              title
              bodyText
              articleType
            }
          }
        }
      `,
    });
    return result.data;
  }

  async newArticle(article: IArticle) {
    const result: ApolloQueryResult<any> = await client.mutate({
      mutation: gql`
        mutation {
          newArticle(id: "${article.id}", title: "${article.title}", bodyText: "${article.bodyText}", articleType: "${article.articleType}") {
            id
            bodyText
            articleType
          }
        }
      `,
    });
    return result.data;
  }

}

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  fetchOptions: {fetch: fetcher},
});
