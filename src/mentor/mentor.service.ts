import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { MentorRepository } from 'src/repositories/mentor.repository';
import { ClientSession, Connection } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { nanoid } from 'nanoid'
import { InjectConnection } from '@nestjs/mongoose';
@Injectable()
export class MentorService {
  constructor(@InjectConnection() private readonly mongoConnection: Connection,private mentorRepository: MentorRepository){}
  private readonly logger = new Logger(MentorService.name);

  /**
   *  Add Mentor details in database
   * @param createMentorDto 
   * @param session 
   * @returns 
   */
  async addMentor(createMentorDto: CreateMentorDto) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const mentor_id = 'mentor_'+ createMentorDto.mentor_name + '_' + nanoid(3);
      createMentorDto.mentor_id = mentor_id;
      this.logger.log(`Adding mentor details with mentor_id:${mentor_id}`)
      const result = await this.mentorRepository.addMentor(createMentorDto,session);
      await session.commitTransaction();
      return result;
    } catch (error) {
        // await session.abortTransaction();
        throw new BadRequestException(error);
    }finally {
      // session.endSession();
    }
   
  }

  /**
   * Get all mentor details
   * @param getQueryDto 
   * @returns 
   */
  async getMentorsDetails(getQueryDto: GetQueryDto) {
    return await this.mentorRepository.getMentors(getQueryDto);
  }

  /**
   * Get mentor details by mentor id 
   * @param mentor_id 
   * @returns 
   */
  async getMentorById(mentor_id: string) {
    this.logger.log(`Getting mentor details with mentor id ${mentor_id}`)
    return await this.mentorRepository.getMentorById(mentor_id);
  }

/**
 * Update mentor details only mentor and admin have access to this
 * @param updateMentorDto 
 * @param session 
 * @returns 
 */
 async update(updateMentorDto: UpdateMentorDto, session:ClientSession) {
    return await this.mentorRepository.updateMentorDetails(updateMentorDto, session);
  }


  /**
   * Get mentor details with query example {mentor_id:<mentor_id>,mentor_name:<name of the mentor>}
   * @param query 
   * @returns 
   */
  async getMentorDetailsWithQuery(query: any){
    return await this.mentorRepository.getMentorDetailsQuery(query)
  }

  // async remove(mentor_id: string) {
  //   return await this.mentorRepository.deleteMentor(mentor_id);
  // }
}
