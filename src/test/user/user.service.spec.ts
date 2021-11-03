import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../components/user/user.repository';
import { User } from '../../components/user/user.entity';
import { UserService } from '../../components/user/user.service';
import { CreateUserDto } from 'src/components/user/dto/user-create.dto';
import { ApiError } from '../../components/errors/APIError';

describe('UserService', () => {

  let service: UserService;

  //Mock User
  const entityMock : User = new User();
  entityMock.id = 12345;
  entityMock.emailAddress = 'test@email.com'

  const repositoryMock = {
    findOne: (): any => entityMock
  };
  
 //Test case 1
 describe('should find user by id', () => { 

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UserService,UserRepository]
      })
      .overrideProvider(UserRepository)
      .useValue(repositoryMock)
      .compile();
  
      service = module.get<UserService>(UserService);
    });

    it("should find user by id", async () => {
      jest.spyOn(repositoryMock, "findOne");
  
      expect(await service.findUserByEmail(entityMock.emailAddress)).toBe(entityMock);
      expect(repositoryMock.findOne).toHaveBeenCalled();
    });

 });

 //Test case 2
 describe('should save user if user does not exist', () => { 


    const repositoryMock = {
      findOne: (): any => null, //null user means user doesnt exist
      save: (entity: any): any => {
        entityList.push(entity);
        return entity;
      },
    };

    //Sample request body
    let createUserDtoMock: CreateUserDto = {
      password : '',
      email: 'test@email.com',
      phoneNumber:'+23455266355',
      fullName: 'Firstname Lastname'
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UserService,UserRepository]
      })
      .overrideProvider(UserRepository)
      .useValue(repositoryMock)
      .compile();

      service = module.get<UserService>(UserService);
    });
    
    let entityList = [];
    it("should save user if user does not exist", async () => {
      jest.spyOn(repositoryMock, "findOne");
      jest.spyOn(repositoryMock, "save");
    
      await service.createUser(createUserDtoMock)

      expect(entityList).toHaveLength(1);
      expect(entityList[0].emailAddress).toBe(createUserDtoMock.email);
      expect(repositoryMock.findOne).toHaveBeenCalled();
      expect(repositoryMock.save).toHaveBeenCalled();
    });
 })


  //Test case 3
  describe('should not save user if user already exists', () => { 

    const repositoryMock = {
      findOne: (): any => entityMock,
      save: (entity: any): any => {
        entityList.push(entity);
        return entity;
      },
    };

    //Sample request body
    let createUserDtoMock: CreateUserDto = {
      password : '',
      email: 'test@email.com',
      phoneNumber:'+23455266355',
      fullName: 'Firstname Lastname'
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UserService,UserRepository]
      })
      .overrideProvider(UserRepository)
      .useValue(repositoryMock)
      .compile();

      service = module.get<UserService>(UserService);
    });
    
    let entityList = [];
    it("should not save user if user already exists", async () => {
      jest.spyOn(repositoryMock, "findOne");
      jest.spyOn(repositoryMock, "save");

      expect(service.createUser(createUserDtoMock)).rejects.toThrowError(ApiError);
      expect(entityList).toHaveLength(0);
      expect(repositoryMock.findOne).toHaveBeenCalled();
      expect(repositoryMock.save).toHaveBeenCalledTimes(0);
    });
    
  })

});
