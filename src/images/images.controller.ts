import { Body, Controller, Get, Headers, HttpCode, HttpException, InternalServerErrorException, Param, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("images", {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload-img")
  uploadImg(@Body() body, @UploadedFile() images: Express.Multer.File, @Headers("token") header){
    try {
      return this.imagesService.uploadImg(body, images, header)
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status)

      throw new InternalServerErrorException("Internal Server Error ")
    }
  
  }
  @Get("/get-all-image")
  async findAllImage() {
    try {
      return this.imagesService.findAllImage();
    } catch (exception) {
      if (exception.status != 500)
      throw new HttpException(exception.response, exception.status)
      throw new InternalServerErrorException("Internal Server Error ")
    }
  }

  @Get("/detail-image/:id")
  async findImageById(@Param("id") id: string){
    try {
      return this.imagesService.findImageById(+id)
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status)
        throw new InternalServerErrorException("Internal Server Error ")
    }
  }
  @Post("/create-comment")
  async createComment(@Body() body, @Headers("token") header){
    try {
      return this.imagesService.createComment(body, header)
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status)
      throw new InternalServerErrorException("Internal Server Error ")
    }
  }

  @Get("/get-all-comment")
  async findCommentByCommentId(@Query('id') id:string ){
    return this.imagesService.findCommentByCommentId(id)
  }
}
