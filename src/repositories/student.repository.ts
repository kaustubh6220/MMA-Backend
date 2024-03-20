import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'class-validator';
import { create } from 'domain';
import { ClientSession, Model } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
import { Student } from 'src/student/entities/student.entity';
export class StudentRepository {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) { }

  async createStudent(createStudentDto: CreateStudentDto, session: ClientSession) {
    let student = new this.studentModel({
      student_id: createStudentDto.student_id,
      student_name: createStudentDto.student_name,
      year_of_admission: createStudentDto.year_of_admission,
      student_class: createStudentDto.student_class,
      student_email_id: createStudentDto.student_email_id,
      date_of_birth: createStudentDto.date_of_birth,
      birth_place: createStudentDto.birth_place,
      state: createStudentDto.state,
      nationality: createStudentDto.nationality,
      religion: createStudentDto.religion,
      father_name: createStudentDto.father_name,
      occupation: createStudentDto.occupation,
      parents_mobile: createStudentDto.parents_mobile,
      guardian_name: createStudentDto.guardian_name,
      guardian_mobile_number: createStudentDto.guardian_mobile_number,
      guardian_profession: createStudentDto.guardian_profession,
      guardian_relation: createStudentDto.guardian_relation,
      annual_income: createStudentDto.annual_income,
      present_address: createStudentDto.present_address,
      pin_code: createStudentDto.pin_code,
      permanent_address: createStudentDto.present_address,
      enrollment_number: createStudentDto.enrollment_number,
      mentor_id: createStudentDto.mentor_id,
      mentor_name:createStudentDto.mentor_name,
      batch:createStudentDto.batch,
      id: createStudentDto.id,
    });
    try {
      student = await student.save({ session })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return student;
  }

  async getStudents(query: GetQueryDto) {
    let from = query.from || 0;
    from = Number(from);

    let limit = query.limit || 0;
    limit = Number(limit);

    let studentsDetails: Student[];
    try {
      if (limit === 0) {
        studentsDetails = await this.studentModel
          .find(query)
          // .populate('client')
          // .populate('user', 'name email')
          .skip(from)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        studentsDetails = await this.studentModel
          .find()
          // .populate('client')
          // .populate('user', 'name email')
          .skip(from)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response;

      if (studentsDetails.length > 0) {
        response = {
          ok: true,
          data: studentsDetails,
          message: 'Get Students Details Ok!',
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No hay student details',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getStudentById(enrollment_number: string) {
    let studentDetail;
    try {
      studentDetail = await this.studentModel.find({ enrollment_number: enrollment_number });
      const firstItem = studentDetail[0];

      return   {
        ok: true,
        data: firstItem,
        message: 'Get Students Details Ok!',
      };
      
    } catch (error) {
      throw new NotFoundException(`The student with this id: ${enrollment_number} does not exist`);
    }
  }
  async updateStudentDetails(updateStudentDetails: UpdateStudentDto, session: ClientSession) {
    const currentDate = new Date();
    currentDate.toUTCString();

    //   let updateData: UpdateStudentDto;

    //   if(updateStudentDetails.hasOwnProperty('student_name') && updateStudentDetails.student_name.length > 0){
    //       updateData.student_name = updateStudentDetails.student_name;
    //   }
    //   if(updateStudentDetails.hasOwnProperty('address') && updateStudentDetails.address.length > 0){
    //     updateData.address = updateStudentDetails.address;
    // }
    // if(updateStudentDetails.hasOwnProperty('annual_income')){
    //   updateData.annual_income = updateStudentDetails.annual_income;
    // }


    let student;
    try {
      student = await this.studentModel
        .findOneAndUpdate({ enrollment_number: updateStudentDetails.enrollment_number }, updateStudentDetails, {
          new: true,
        })
        .session(session)
        .exec();
        console.log("Updated Data Successfully !",currentDate)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!student) {
      throw new ConflictException('Error trying to update student');
    }
    return {
      ok: true,
      data: student,
      message: 'Update details successfully',
    };;
  }

  async deleteStudent(student_id: string){
    let deleteStudent;
    try {
      deleteStudent = await this.studentModel.deleteOne({student_id:student_id});
      return deleteStudent;
    } catch (error) {
      throw new InternalServerErrorException(error); 
    }
  }

  async getStudentDetailsQuery(query: any) {
    let from = query.from || 0;
    from = Number(from);

    let limit = query.limit || 0;
    limit = Number(limit);

    let studentsDetails: Student[];
    try {
      if (limit === 0) {
        studentsDetails = await this.studentModel
          .find(query)
          // .populate('client')
          // .populate('user', 'name email')
          .skip(from)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        studentsDetails = await this.studentModel
          .find(query)
          // .populate('client')
          // .populate('user', 'name email')
          .skip(from)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response;

      if (studentsDetails.length > 0) {
        response = {
          ok: true,
          data: studentsDetails,
          message: 'Get Students Details with query Ok!',
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No student details avaiable with given query',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}