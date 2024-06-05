import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SuccessException } from 'src/config/response';
@Injectable()
export class AuthService {
    constructor(private JwtService: JwtService){}
    prisma = new PrismaClient()
    async login(model) {
        let {email, password} = model
        let checkEmail = await this.prisma.users.findFirst({
            where: {
                email: email
            }
        })
        if(checkEmail){
            if (bcrypt.compareSync(password, checkEmail.password)){
                let token = this.JwtService.sign({ data: { id: checkEmail.user_id }}, { expiresIn: "5d", algorithm: "HS256", secret: "BI_MAT" })
                throw new SuccessException(HttpStatus.OK, token, "Login Success",  new Date().toISOString())
            }else{
                throw new HttpException("Mật khẩu không đúng", HttpStatus.BAD_REQUEST)
            }
        }else{
            throw new HttpException("Email không đúng", HttpStatus.BAD_REQUEST)
        }
    }
    async signIn(model, avatar) {
        console.log(avatar)
        const urlImage = `http://localhost:8080/${avatar.path}`;
        console.log("model", model)
        let { email, password, name, age} = model
        console.log("model", model)
        let newUser = {
            email,
            password: bcrypt.hashSync(password, 10),
            name,
            age: parseInt(age),
            avatar: urlImage,
        }
        let checkEmail = await this.prisma.users.findFirst({
            where: {
                email: email
            }
        })
        if (checkEmail){
            throw new HttpException("Email đã tồn tại", HttpStatus.BAD_REQUEST)
        }
        let data = await this.prisma.users.create({data: newUser})
        throw new SuccessException(HttpStatus.CREATED, data, "Sign Success", new Date().toISOString())
    }
}
