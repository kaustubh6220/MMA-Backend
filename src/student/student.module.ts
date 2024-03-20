import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentRepository } from 'src/repositories/student.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Student.name,schema:StudentSchema}])
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports:[StudentService, StudentRepository]
})
export class StudentModule {}
