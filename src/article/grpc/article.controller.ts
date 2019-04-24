import {Controller, Get, OnModuleInit, Param, Post, Req} from '@nestjs/common';
import {Client, ClientGrpc} from '@nestjs/microservices';
import {articleGrpcClientOptions} from './article-grpc-client.options';
import {Body} from '@nestjs/common/decorators/http/route-params.decorator';
import {article} from '../../../codegen/rpc';
import ArticleService = article.ArticleService;
import IArticle = article.IArticle;

@Controller('article')
export class ArticleController implements OnModuleInit {

  @Client(articleGrpcClientOptions)
  private readonly client: ClientGrpc;

  private articleService: ArticleService;

  onModuleInit() {
    this.articleService = this.client.getService<ArticleService>('ArticleService');
  }

  @Get(':id')
  findOne(@Param() params): Promise<article.Article> {
    return this.articleService.findOne({id: params.id});
  }

  @Get()
  findAll(@Req() request): Promise<article.ListArticles> {
    return this.articleService.findAll(request);
  }

  @Post()
  create(@Body() article: IArticle): Promise<article.Article> {
    return this.articleService.add(article);
  }
}
