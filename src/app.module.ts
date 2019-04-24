import {Module} from '@nestjs/common';
import {ArticleModule} from './article/article.module';
import {NinjaModule} from './ninja/ninja.module';

@Module({
  imports: [ArticleModule, NinjaModule],
})
export class ApplicationModule {
}
