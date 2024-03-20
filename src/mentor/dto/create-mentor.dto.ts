
import { Schema as MongooseSchema } from 'mongoose';
export class CreateMentorDto {

mentor_id:string;

mentor_name:string;

designation:string;

mobile_number:number;

class_teacher_flag :string;

class_teacher_class:string;

assign_batch :string;

assign_class: string;

id: MongooseSchema.Types.ObjectId;

mentor_email:string

}
