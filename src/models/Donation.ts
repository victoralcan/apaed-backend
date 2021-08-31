import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Donor from './Donor';
import ProductLocalDonation from './ProductLocalDonation';

@Entity('donations')
class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('datetime')
  donation_date: Date;

  @Column()
  donor_id: string;

  @ManyToOne(() => Donor, { eager: true })
  donor: Donor;

  @OneToMany(
    () => ProductLocalDonation,
    productLocalDonation => productLocalDonation.donation,
  )
  productLocalDonation: ProductLocalDonation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Donation;
