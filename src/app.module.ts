import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { StudentModule } from './student/student.module';
import { MentorModule } from './mentor/mentor.module';
@Module({
  imports: [
    ConfigModule,
    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    AdminModule,
    StudentModule,
    MentorModule
  ],
  controllers: [AppController],
  providers: [AppService, AdminService],
})
export class AppModule {}
