import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import User from './User';
import Image from './Image';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Image, image => image.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id'})
  images: Image[];
}