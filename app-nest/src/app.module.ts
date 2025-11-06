import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

// Determine if running inside Docker container
const runningInDocker = process.env.RUNNING_IN_DOCKER === 'true';

//Resolve path to external .env file
const externalEnvPath = join(__dirname, '..', '..', '.env');
@Module({
  imports: [
    //Global configuration module
    ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
    ignoreEnvFile: runningInDocker,
    envFilePath: runningInDocker ? undefined : externalEnvPath,
  }),

    //Connection to Postgres database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.user'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.db'),
        autoLoadEntities: true,
        synchronize: true, 
      })
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
