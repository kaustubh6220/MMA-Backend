import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from 'src/repositories/student.repository';
import { ClientSession, Connection } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { nanoid } from 'nanoid'
import { InjectConnection } from '@nestjs/mongoose';
@Injectable()
export class StudentService {
  constructor(@InjectConnection() private readonly mongoConnection: Connection, private studentRepository: StudentRepository) { }
  private readonly logger = new Logger(StudentService.name);
  async addStudent(createStudentDto: CreateStudentDto) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    const student_id = nanoid(14);
    createStudentDto.student_id = student_id;
    try {
      this.logger.log(`Adding student details with student_id:${student_id}`)
      let result = await this.studentRepository.createStudent(createStudentDto, session);
      await session.commitTransaction();
      return result
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);

    } finally {
      session.endSession();
    }
  }

  async getStudentsDetails(getQueryDto: GetQueryDto) {
    return await this.studentRepository.getStudents(getQueryDto);
  }

  async getStudentById(enrollment_number: string) {
    this.logger.log(`Getting student details with student id ${enrollment_number}`)
    return await this.studentRepository.getStudentById(enrollment_number);
  }

  async update(updateStudentDto: UpdateStudentDto, session: ClientSession) {
    return await this.studentRepository.updateStudentDetails(updateStudentDto, session);
  }

  async remove(student_id: string) {
    return await this.studentRepository.deleteStudent(student_id);
  }
}