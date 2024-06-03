import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { SuccessException } from 'src/config/response';

@Injectable()
export class ImagesService {
    constructor(private JwtService: JwtService){}
    prisma = new PrismaClient()
    async findAllImage (){
        const data = await this.prisma.images.findMany()
        throw new SuccessException(HttpStatus.OK, data, "Sign Success", new Date().toISOString())
    }
    async uploadImg (model, file, header) {
        const { name, description, img_type} = model
        const imgUrl = `http://localhost:8080/${file.path}`
        let decoToken = this.JwtService.decode(header)
        let  imgNew = {
            name,
            img_link: imgUrl,
            description,
            img_type,
            user_id: decoToken.data.id,
        }
        await this.prisma.images.create({ data: imgNew })
        throw new SuccessException(HttpStatus.OK, "", "Create Image Success", new Date().toISOString())
    }

    async findImageById(id) {
        const dataDetail = await this.prisma.images.findFirst({
            where:{
                img_id: id,
            }
        })
        if (dataDetail){
            throw new SuccessException(HttpStatus.OK, dataDetail, "Get Detail Image Success", new Date().toISOString())
        }else{
            throw new HttpException("Hình ảnh không tồn tại", HttpStatus.NOT_FOUND)
        }
    }
    async createComment(model, token){
        const {img_id, content} = model
        const decoToken = this.JwtService.decode(token)
        const dataComment = {
            img_id,
            content,
            user_id: decoToken.data.id
        }
        await this.prisma.comments.create({data: dataComment})
        throw new SuccessException(HttpStatus.OK, '', "Comment Success", new Date().toISOString())
    }
    async findCommentByCommentId(id){
        const dataComment = await this.prisma.comments.findMany({
            where:{
                img_id: parseInt(id)
            },
            include:{
                users: true
            }
        })
        throw new SuccessException(HttpStatus.OK, dataComment, "Get All Comment Success", new Date().toISOString())
    }
    async searchImage(query) {
        const dataSearch = await this.prisma.images.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { img_type: { contains: query } },
                ],
            },
        });
        throw new SuccessException(HttpStatus.OK, dataSearch, "Get Data Search Success", new Date().toISOString()) 
    }

    async deleteImage(id, header) {
        let decoToken = this.JwtService.decode(header);
        const data = await this.prisma.images.delete({ 
            where: { 
                img_id: parseInt(id),
                user_id: decoToken.data.id 
            }})
        throw new SuccessException(HttpStatus.OK, "", "Get Data Search Success", new Date().toISOString()) 
    }
    async saveImage(body, header){
        const {img_id} = body
        const decoToken = this.JwtService.decode(header);
        const dataImage = await this.prisma.save_img.findFirst({
            where:{
                img_id: img_id,
                user_id: decoToken.data.id
            }
        })
        if (dataImage){

        }else{
            
        }
        console.log("dataImage", dataImage)
    }
}
