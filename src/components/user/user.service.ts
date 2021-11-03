import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user-create.dto';
import { ApiError } from '../errors/APIError';

@Injectable()
export class UserService {

    salt: string = bcrypt.genSaltSync(10);
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    /**
     * 
     * @param email 
     * @returns 
     */
    public async findUserByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { emailAddress: email , deleted : false} });
    }

    /**
     * 
     * @param userRequest 
     */
    async createUser(userRequest: CreateUserDto) : Promise<void> {

        var existingUser = await this.findUserByEmail(userRequest.email);
        
        if(existingUser){
            throw new ApiError(`User with ${userRequest.email} Already Exists`, HttpStatus.CONFLICT);
        }

        var newUser : User = new User();

        newUser.emailAddress = userRequest.email;
        newUser.password =  bcrypt.hashSync(userRequest.password, this.salt);
        newUser.phoneNumber = userRequest.phoneNumber
        newUser.fullName = userRequest.fullName

        await this.userRepository.save(newUser);
    }

}
