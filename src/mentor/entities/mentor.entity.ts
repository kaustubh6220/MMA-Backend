import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
@Schema()
export class Mentor extends Document{
    
  @Prop({ type: MongooseSchema.Types.ObjectId, required:false })
  id: MongooseSchema.Types.ObjectId;
  
  @Prop({
        type: String,
      })
    mentor_id:string;
    @Prop({
        type: String,
      })
    mentor_name:string;
    @Prop({ type: String })
    designation:string;
  
    @Prop({ type: Number })
    mobile_number:Number;
    @Prop({ type: String })
    class_teacher_flag :string;
    @Prop({ type: String })
    class_teacher_class:string;
    @Prop({ type: String })
    assign_batch :string;
    
    @Prop({ type: String })
    assign_class: string;
    
    @Prop({ type: String })
    mentor_email:string;

}
export const MentorSchema = SchemaFactory.createForClass(Mentor);