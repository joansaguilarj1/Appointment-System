import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { AppointmentStatus } from "../dto/user-role.enum";

@Entity({
  name: "appointments",
})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ type: "varchar", length: 5, nullable: false })
  time: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  subject: string;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn()
  user: User;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
    default: AppointmentStatus.active,
  })
  status: AppointmentStatus;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  UpdateAt: Date;
}
