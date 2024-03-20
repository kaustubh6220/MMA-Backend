import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';
@Schema()
export class Student extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, required:false })
  id: MongooseSchema.Types.ObjectId;
  @Prop({
    type: String,
    required: false,
  })
  student_name: string;

  @Prop({ type: Number })
  year_of_admission: number;

  @Prop({ type: String })
  student_class: string;

  @Prop({ type: String })
  student_email_id: string;

  @Prop({ type: String })
  date_of_birth: string;

  @Prop({ type: String })
  birth_place: string;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  nationality: string;

  @Prop({ type: String })
  religion: string;

  @Prop({ type: String })
  father_name: string;

  @Prop({ type: String })
  occupation: string;

  @Prop({ type: String })
  parents_mobile: number;

  @Prop({ type: String })
  guardian_name: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  guardian_profession: string;

  @Prop({ type: String })
  guardian_mobile_number: number;

  @Prop({ type: String })
  guardian_relation: string;

  @Prop({ type: String })
  annual_income: string;

  @Prop({ type: String })
  present_address: string;

  @Prop({ type: String })
  pin_code: string;

  @Prop({ type: String })
  permanent_address: string;

  @Prop({ type: String })
  student_id: string;

  @Prop({ type: String })
  enrollment_number: string;

  @Prop({type:String})
  mentor_id: string;

  @Prop({type:String})
  mentor_name: string;

  @Prop({type:String})
  batch: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
