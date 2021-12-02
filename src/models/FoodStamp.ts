import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('food_stamp')
class FoodStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('boolean')
  open: boolean;
  /* 
  @Column()
  product_local_donation_id: string;

  @OneToMany(() => ProductLocalDonation, pld => pld.food_stamp_id)
  product_local_donation: ProductLocalDonation[]; */

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FoodStamp;
