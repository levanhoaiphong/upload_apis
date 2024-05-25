import { Controller, Delete, Get, Headers, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/get-info-user")
  getInfoUser(@Headers("token") header){
    return this.usersService.getInfoUser(header)
  }

  @Get("/get-save-img")
  getImageSave(@Headers("token") header) {
    return this.usersService.getImageSave(header)
  }

  @Get("/get-list-img")
  getListImgByUserId(@Headers("token") header) {
    return this.usersService.getListImgByUserId(header)
  }
  
  @Delete("/delete-img-by-userId")
  deleteImgByUserId(@Param("id") id: string, @Headers("token") header) {
    return this.usersService.deleteImgByUserId(header)
  }
}
