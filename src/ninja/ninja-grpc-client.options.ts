import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const ninjaGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50051',
    package: 'ninja',
    protoPath: join(__dirname, '../../proto/ninja/ninja.proto'),
  },
};
