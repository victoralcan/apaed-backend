import { getCustomRepository } from 'typeorm';
import UsersRepository from '../../repositories/UsersRepository';
import User from '../../models/User';

interface IRequestDTO {
  name: string;
  password: string;
  local_id: string;
  role_id: string;
  active: boolean;
}

class CreateUserService {
  public async execute(user: IRequestDTO): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    try {
      const newUser = usersRepository.create(user);
      await usersRepository.save(newUser);
      return newUser;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateUserService;
