import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { create } from "domain";
import { Session } from "inspector";
import { ClientSession, Model } from "mongoose";
import { GetQueryDto } from "src/dto/getQueryDto";
import { CreateMentorDto } from "src/mentor/dto/create-mentor.dto";
import { UpdateMentorDto } from "src/mentor/dto/update-mentor.dto";
import { Mentor } from "src/mentor/entities/mentor.entity";

export class MentorRepository {
  constructor(
    @InjectModel(Mentor.name) private readonly mentorModel: Model<Mentor>,
  ) { }

  async addMentor(createMentorDto: CreateMentorDto, session: ClientSession) {
    let mentor = new this.mentorModel({
      mentor_id: createMentorDto.mentor_id,
      mentor_name: createMentorDto.mentor_name,
      mentor_email: createMentorDto.mentor_email,
      mobile_number: createMentorDto.mobile_number,
      assign_batch: createMentorDto.assign_batch,
      assign_class: createMentorDto.assign_class,
      class_teacher_class: createMentorDto.class_teacher_class,
      class_teacher_flag: createMentorDto.class_teacher_flag,
      designation: createMentorDto.designation,
    });

    try {
      mentor = await mentor.save({ session });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return mentor;
  }

  async getMentors(query: GetQueryDto) {
    let from = query.from || 0;
    from = Number(from);

    let limit = query.limit || 0;
    limit = Number(limit);

    let mentorsDetails: Mentor[];
    try {
      if (limit === 0) {
        mentorsDetails = await this.mentorModel
          .find()
          // .populate('client')
          // .populate('user', 'name email')
          .skip(from)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        mentorsDetails = await this.mentorModel
          .find()
          // .populate('client')
          // .populate('user', 'name email')
          .skip(from)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response;

      if (mentorsDetails.length > 0) {
        response = {
          ok: true,
          data: mentorsDetails,
          message: 'Get Mentors Details Ok!',
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No hay mentor details',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMentorById(mentor_id: string) {
    let mentorDetail;
    console.log("stasdasd", mentor_id)
    try {
      mentorDetail = await this.mentorModel.find({ mentor_id: mentor_id });

      return {
        ok: true,
        data: mentorDetail,
        message: 'Get Mentors Details Ok'
      }
    } catch (error) {
      throw new NotFoundException(`The mentor with this id: ${mentor_id} does not exist`);
    }
  }

  async getMentorDetailsQuery(query: any) {
    let from = query.from || 0;
    from = Number(from);

    let limit = query.limit || 0;
    limit = Number(limit);

    let mentorsDetails: Mentor[];
    try {
      if (limit === 0) {
        mentorsDetails = await this.mentorModel
          .find(query)
          // .populate('client')
          // .populate('user', 'name email')
          .skip(from)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        mentorsDetails = await this.mentorModel
          .find(query)
          // .populate('client')
          // .populate('user', 'name email')
          .skip(from)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response;

      if (mentorsDetails.length > 0) {
        response = {
          ok: true,
          data: mentorsDetails,
          message: 'Get Mentors Details with query Ok!',
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No mentor details avaiable with given query',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async updateMentorDetails(updateMentorDetails: UpdateMentorDto, session: ClientSession) {
    const currentDate = new Date();
    currentDate.toUTCString();

    //   let updateData: UpdateMentorDto;

    //   if(updateMentorDetails.hasOwnProperty('mentor_name') && updateMentorDetails.mentor_name.length > 0){
    //       updateData.mentor_name = updateMentorDetails.mentor_name;
    //   }
    //   if(updateMentorDetails.hasOwnProperty('address') && updateMentorDetails.address.length > 0){
    //     updateData.address = updateMentorDetails.address;
    // }
    // if(updateMentorDetails.hasOwnProperty('annual_income')){
    //   updateData.annual_income = updateMentorDetails.annual_income;
    // }


    let mentor;
    try {
      mentor = await this.mentorModel
        .findOneAndUpdate({ mentor_id: updateMentorDetails.mentor_id }, updateMentorDetails, {
          new: true,
        })
        .session(session)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!mentor) {
      throw new ConflictException('Error trying to update mentor');
    }
    return mentor;
  }
}