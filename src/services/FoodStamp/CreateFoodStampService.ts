import { getCustomRepository } from 'typeorm';
import FoodStampRepository from '../../repositories/FoodStampRepository';
import FoodStamp from '../../models/FoodStamp';

interface IRequestDTO {
  type: string;
  open: boolean;
  product_id: string;
  active: boolean;
}

class CreateFoodStampService {
  public async execute(foodStamp: IRequestDTO): Promise<FoodStamp | undefined> {
    const foodStampRepository = getCustomRepository(FoodStampRepository);

    try {
      const newFoodStamp = foodStampRepository.create(foodStamp);
      await foodStampRepository.save(newFoodStamp);
      return newFoodStamp;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateFoodStampService;
