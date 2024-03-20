import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res, Query, HttpStatus, Logger } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Response, query } from 'express';
import { GetQueryDto } from 'src/dto/getQueryDto';

@Controller('student')
export class StudentController {
  constructor(@InjectConnection() private readonly mongoConnection: Connection,
  private readonly studentService: StudentService) {}
  private readonly logger = new Logger(StudentController.name);
  @Post('/addStudent')
  async create(@Body() createStudentDto: CreateStudentDto,@Res() res: Response) {
    // const session = await this.mongoConnection.startSession();
    // session.startTransaction();
    this.logger.log(`API:[addstudent] body:[${JSON.stringify(createStudentDto)}]`);
    try {
      const newStudent: any = await this.studentService.addStudent(createStudentDto);
      // await session.commitTransaction();
      return res.status(HttpStatus.OK).send({
        "status": true,
        "data": newStudent,
        "message":"Student details added successfully"
      });
       
    } catch (error) {
      // await session.abortTransaction();
      throw new BadRequestException(error);
      
    }finally {
      // session.endSession();
  }
  }

  @Get('/getStudents')
 async getAllStudentsDetails(@Query() getQueryDto: any, @Res() res: any) {
    this.logger.log(`API:[getStudents] body:[${JSON.stringify(getQueryDto)}]]`);
    const storages: any = await this.studentService.getStudentsDetails(getQueryDto);
    return res.status(HttpStatus.OK).send(storages);
  }

  @Get('/getStudentById')
 async getStudentByStudentId(@Query() query: any, @Res() res:Response) {
    this.logger.debug(`Getting student by student id with id ${query.enrollment_number}`)
    const storage: any = await this.studentService.getStudentById(query.enrollment_number);
    console.log(storage)
    return res.status(HttpStatus.OK).send(storage);

  }
  
  @Patch('/updateStudent')
  async update(@Body() updateStudentDto: UpdateStudentDto, @Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try { 
      const updatedStudentDetails: any =  await this.studentService.update(updateStudentDto, session);
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(updatedStudentDetails);      
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally{
      session.endSession();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}