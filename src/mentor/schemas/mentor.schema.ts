/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type MentorDocument = HydratedDocument<Mentor>;
@Schema()
export class Mentor {
@Prop()
mentor_id:string;
@Prop()
mentor_name:string;
@Prop()
designation:string;

@Prop()
mobile_number:number;
@Prop()
class_teacher_flag :string;
@Prop()
class_teacher_class:string;
@Prop()
assign_batch :string;

@Prop()
assign_class: string;
@Prop()
mentor_email: string;
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);