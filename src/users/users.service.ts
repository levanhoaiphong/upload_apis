import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { SuccessException } from 'src/config/response';

@Injectable()
export class UsersService {
    constructor(private JwtService: JwtService) { }
    prisma = new PrismaClient()
    async getInfoUser(token){
        const decodeToken = this.JwtService.decode(token)
        const dataUser = await this.prisma.users.findFirst({
            where:{
                    user_id: decodeToken.data.id
            }
        })
        throw new SuccessException(HttpStatus.OK, dataUser, "Get User Success", new Date().toISOString())
    }
    async getImageSave(token){

        return token
    }
    async getListImgByUserId(token){
        const decodeToken = this.JwtService.decode(token)
        const dataImg = await this.prisma.images.findMany({
            where:{
                user_id: decodeToken.data.id
            }
        })
        throw new SuccessException(HttpStatus.OK, dataImg, "Get List Image Success", new Date().toISOString())
    }
    async deleteImgByUserId(token){
        return token
    }
}
