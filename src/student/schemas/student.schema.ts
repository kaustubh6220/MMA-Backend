/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type StudentDocument = HydratedDocument<Student>;
@Schema()
export class Student {
  @Prop()
  student_name : string;

  @Prop()
  year_of_admission: number;

  @Prop()
  class: string;
  
  @Prop()
  email_id: string;

  @Prop()
  date_of_birth: string;
  @Prop()
  birth_place: string;
  @Prop()
  state: string;
  @Prop()
  nationality: string;

  @Prop()
  religion: string;
  @Prop()
  father_name: string;
  @Prop()
  occupation: string;
  @Prop()
  parents_mobile: string;

  @Prop()
  guardian_name: string;

  @Prop()
  address: string;
  @Prop()
  guardian_profession: string;
  @Prop()
  guardian_mobile_number: string;
  @Prop()
  relation: string;
  @Prop()
  annual_income: string;
  @Prop()
  present_address: string;
  @Prop()
  pin_code: string;
  @Prop()
  permanent_address: string;
  @Prop()
  student_id: string;
  @Prop()
  mentor_id:string;

  @Prop()
  mentor_name: string;
  @Prop()
  batch:string

}

export const StudentSchema = SchemaFactory.createForClass(Student);
