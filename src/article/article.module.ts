import {Module} from '@nestjs/common';
import {ArticleController} from './grpc/article.controller';
import {ArticleGraphController} from './graphql/article-graph.controller';
import {ArticleGraphService} from './graphql/article-graph-service';

@Module({
  controllers: [ArticleController, ArticleGraphController],
  providers: [ArticleGraphService],
})
export class ArticleModule {
}
