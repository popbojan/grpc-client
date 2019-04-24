import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const articleGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50051',
    package: 'article',
    protoPath: join(__dirname, '../../../proto/article/article.proto'),
  },
};
