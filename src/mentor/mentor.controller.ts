import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Res, HttpStatus, BadRequestException, Query } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Response } from 'express';
import { GetQueryDto } from 'src/dto/getQueryDto';

@Controller('mentor')
export class MentorController {
  constructor(@InjectConnection() private readonly mongoConnection: Connection,
    private readonly mentorService: MentorService) { }
  private readonly logger = new Logger(MentorController.name);

  /**
   * 
   * @param createMentorDto 
   * @param res 
   * @returns 
   */
  @Post('/addMentor')
  async create(@Body() createMentorDto: CreateMentorDto, @Res() res: Response) {
    // const session = await this.mongoConnection.startSession();
    // session.startTransaction();
    this.logger.log(`Invoking API:[addmentor] body:[${JSON.stringify(createMentorDto)}]`);
    try {
      const newMentor: any = await this.mentorService.addMentor(createMentorDto);
      // await session.commitTransaction();
      return res.status(HttpStatus.OK).send({
        "status": true,
        "data": newMentor,
        "message": "Mentor details added successfully"
      });

    } catch (error) {
      // await session.abortTransaction();
      throw new BadRequestException(error);

    } finally {
      // session.endSession();
    }
  }

  /**
   * 
   * @param getQueryDto 
   * @param res 
   * @returns 
   */
  @Get('/getMentors')
  async getAllMentorsDetails(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
    this.logger.log(`Invoking API:[getMentors] body:[${JSON.stringify(getQueryDto)}]`);
    const storages: any = await this.mentorService.getMentorsDetails(getQueryDto);
    return res.status(HttpStatus.OK).send(storages);
  }

  /**
   * 
   * @param query 
   * @param res 
   * @returns 
   */
  @Get('/getMentorById')
  async getMentorByMentorId(@Query() query: any, @Res() res: Response) {
    this.logger.log(`Invoking API:[getMentorById] `);
    this.logger.debug(`Getting mentor by mentor id with id ${query.mentor_id}`)
    const storage: any = await this.mentorService.getMentorById(query.mentor_id);
    console.log(storage)
    return res.status(HttpStatus.OK).send(storage);

  }

  /**
   * 
   * @param updateMentorDto 
   * @param res 
   * @returns 
   */
  @Patch('/updateMentor')
  async update(@Body() updateMentorDto: UpdateMentorDto, @Res() res: Response) {
    this.logger.log(`Invoking API:[updateMentor] Body:${updateMentorDto} `);
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const updatedMentorDetails: any = await this.mentorService.update(updateMentorDto, session);
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(updatedMentorDetails);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }
}