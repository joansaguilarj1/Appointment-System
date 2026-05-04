import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential.entity";
import { Appointment } from "./Appointment.entity";

@Entity({
  name: "users",
})

export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: "date", nullable: false })
  birthdate: Date;

  @Column({ type: "integer", unique: true, nullable: false })
  nDni: number;

  @OneToOne(() => Credential)
  @JoinColumn()
  credential: Credential;

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[];
  
  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  UpdateAt: Date;



}
