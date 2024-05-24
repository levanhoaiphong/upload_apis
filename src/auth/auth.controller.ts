import { Body, Controller, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("/login")
  login(@Body() body){
    return this.authService.login(body)
  }

  @HttpCode(200)
  @UseInterceptors(FileInterceptor("avatar", {
    storage: diskStorage({
      destination: process.cwd() + "/public/avatar",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/sign-in")
  signUp(@Body() body, @UploadedFile() avatar: Express.Multer.File){
    try{
      console.log("process", process)
      return this.authService.signIn(body, avatar)
    }catch(exception) {
      if(exception.status != 500)
      throw new HttpException(exception.response, exception.status)
    
      throw new InternalServerErrorException("Internal Server Error ")
    }
  }
}
