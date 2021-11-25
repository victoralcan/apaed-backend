import { getCustomRepository } from 'typeorm';
import FoodStamp from '../../models/FoodStamp';
import FoodStampRepository from '../../repositories/FoodStampRepository';

interface IRequestDTO {
  id: string;
  type: string;
  open: boolean;
  product_id: string;
  active: boolean;
}

class UpdateFoodStampService {
  public async execute(
    toUpdateFoodStamp: IRequestDTO,
  ): Promise<FoodStamp | undefined> {
    const foodStampRepository = getCustomRepository(FoodStampRepository);
    const updateResult = await foodStampRepository.update(
      {
        id: toUpdateFoodStamp.id,
      },
      toUpdateFoodStamp,
    );

    if (updateResult.affected) {
      return await foodStampRepository.findOne({
        where: { id: toUpdateFoodStamp.id },
      });
    }
    return undefined;
  }
}

export default UpdateFoodStampService;
