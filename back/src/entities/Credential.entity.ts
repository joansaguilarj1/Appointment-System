import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({
  name: "credentials",
})
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  username: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @OneToOne(() => User)
  user: User;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  UpdateAt: Date;
}
