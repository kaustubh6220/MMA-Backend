import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MentorService } from 'src/mentor/mentor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mentor, MentorSchema } from 'src/mentor/entities/mentor.entity';
import { MentorRepository } from 'src/repositories/mentor.repository';
import { StudentRepository } from 'src/repositories/student.repository';
import { StudentService } from 'src/student/student.service';
import { Student, StudentSchema } from 'src/student/entities/student.entity';
// import { Mentor, MentorSchema } from './entities/mentor.entity';
@Module({
  imports:[
    MongooseModule.forFeature([{name: Mentor.name,schema:MentorSchema}]),
    MongooseModule.forFeature([{name: Student.name,schema:StudentSchema}])
  ],
  controllers: [AdminController],
  providers: [AdminService, MentorService,MentorRepository, StudentRepository, StudentService],
  exports:[AdminService, MentorRepository, StudentService]
})
export class AdminModule {}
