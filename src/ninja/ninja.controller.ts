import {Controller, Get, OnModuleInit, Param, Post, Req} from '@nestjs/common';
import {Client, ClientGrpc} from '@nestjs/microservices';
import {Observable} from 'rxjs';
import {grpcClientOptions} from '../grpc-client.options';
import {Body} from '@nestjs/common/decorators/http/route-params.decorator';

interface IEmpty {
}

interface INinja {
  id: number;
  name: string;
}

interface NinjaService {
  findOne(data: { id: number }): Observable<any>;
  findAll(empty: IEmpty): Observable<any>;
  add(ninja: INinja): Observable<any>;
}

@Controller('ninja')
export class NinjaController implements OnModuleInit {

  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;

  private ninjaService: NinjaService;

  onModuleInit() {
    this.ninjaService = this.client.getService<NinjaService>('NinjaService');
  }

  @Get(':id')
  execute(@Param() params): Observable<any> {
    return this.ninjaService.findOne({ id: +params.id });
  }

  @Get()
  findAll(@Req() request): Observable<any> {
    return  this.ninjaService.findAll(request);
  }

  @Post()
  create(@Body() ninja: INinja): Observable<any> {
    return this.ninjaService.add(ninja);
  }
}
