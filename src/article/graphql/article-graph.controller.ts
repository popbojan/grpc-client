import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import {ArticleGraphService} from './article-graph-service';
import {IArticle} from '../../codegen';

@Controller('/graph/article')
export class ArticleGraphController {

  constructor(private readonly articleGraphService: ArticleGraphService) {
  }

  @Get(':id')
  findOne(@Param() params): Promise<any> {
    return this.articleGraphService.getArticle(params.id);
  }

  @Get()
  findAll(@Req() request): Promise<any> {
    return this.articleGraphService.getArticles();
  }

  @Post()
  create(@Body() article: IArticle): Promise<any> {
    return this.articleGraphService.newArticle(article);
  }
}
