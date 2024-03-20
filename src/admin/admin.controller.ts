import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Res, Logger, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fstat, readFileSync } from 'fs';
import * as fs from 'fs';
import csvParser, { CsvParser } from 'csv-parser';
import { Request, Response } from 'express';
import { Readable } from 'stream';
// const csv =  require('csv-parser')
import csvToJson from 'csvtojson';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MentorService } from 'src/mentor/mentor.service';
import { StudentService } from 'src/student/student.service';
const csv = require('csvtojson')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly mentorService: MentorService, private readonly studentService: StudentService, private readonly adminService: AdminService) { }
  private readonly logger = new Logger(MentorService.name);

  @Post('/uploadMentor')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadMentor(@UploadedFile() file: any, @Req() req: Request, @Res() res: Response) {
    this.logger.log(`Upload mentor file`);
    // const session = await this.mongoConnection.startSession();
    // session.startTransaction();
    let mentor_names = [];
    // const  jsonObj = await csv()
    let count = 0;
    csv()
      .fromFile(file.path)
      .then((jsonObj) => {
        // console.log(jsonObj)
        for (let key in jsonObj) {
          // console.log(jsonObj[key]);
          this.logger.log(`Adding mentor details of [Mentor_Name:${jsonObj[key].mentor_name}]`);
          this.mentorService.addMentor(jsonObj[key]);
          mentor_names.push(jsonObj[key].mentor_name);
          count++;
        }
        this.logger.log(`Successfully added ${count} mentors`);
        return res.status(HttpStatus.OK).send({
          "status": true,
          "data": mentor_names,
          "message": `successfully added ${count} mentors`
        });

        // session.commitTransaction();
      })
  }

  @Post('/uploadStudent')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadStudent(@UploadedFile() file: any, @Req() req: Request, @Res() res: Response) {
    this.logger.log(`Upload student csv file`);
    let student_names = [];
    let count = 0;
    csv()
      .fromFile(file.path)
      .then((jsonObj) => {
        for (let key in jsonObj) {
          this.logger.log(`Adding student details of [Student_Name:${jsonObj[key].student_name}]`);
          this.studentService.addStudent(jsonObj[key]);
          student_names.push(jsonObj[key].student_name);
          count++;
        }
        this.logger.log(`Successfully added ${count} students`);
        return res.status(HttpStatus.OK).send({
          "status": true,
          "data": student_names,
          "message": `successfully added ${count} students`
        });
      })
  }

  // @Post('uploadMentor')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, callback) => {
  //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //       callback(null, file.fieldname + '-' + uniqueSuffix);
  //     },
  //   }),
  // }))
  //   uploadFile(@UploadedFile() file,@Res() res:Response) {
  //     console.log(file)
  //      // Check if the file exists
  //     //  if (!await fs.pathExists(file.path)) {
  //     //   return res.status(404).json({ message: 'File not found' });
  //     // }
  //     const fileContent = fs.readFileSync(file.path,'utf-8');
  //     const array = fileContent.toString().split("\r");
  //     console.log(array)
  //     res.send(array)


  //     const response = {
  //       message: "File uploaded successfully!",

  //       data: { 
  //         originalname: file.originalname,
  //         filename: file.filename,
  //       }
  //     };
  //     return response;
  //   }


  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
