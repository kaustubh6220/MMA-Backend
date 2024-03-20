import { IsDateString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
import { IsEmail } from 'class-validator';
export class CreateStudentDto {
  student_name: string;
  year_of_admission: number;

  student_class: string;

  @IsEmail()
  student_email_id: string;

  @IsDateString()
  date_of_birth: string;

  birth_place: string;

  state: string;

  nationality: string;

  religion: string;

  father_name: string;

  occupation: string;

  parents_mobile: number;

  guardian_name: string;

  address: string;

  guardian_profession: string;

  guardian_mobile_number: number;

  guardian_relation: string;

  annual_income: string;

  present_address: string;

  pin_code: string;

  permanent_address: string;

  student_id: string;

  enrollment_number: string;

  id: MongooseSchema.Types.ObjectId;

  mentor_id: string;

  mentor_name: string;

  batch: string
}