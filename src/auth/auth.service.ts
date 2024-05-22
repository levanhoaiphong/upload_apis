import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private JwtService: JwtService){}
    prisma = new PrismaClient()
    login(model) {
        let {email, password} = model
        let token = this.JwtService.sign({ data: "abc" }, { expiresIn: "5d", algorithm: "HS256", secret: "BI_MAT" })
        return token
    }
    signIn(model) {
        let { email, password, name, age, avatar } = model
        return model
    }
}
