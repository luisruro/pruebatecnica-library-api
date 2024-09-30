import { Rol } from "src/common/enums/role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ type: 'enum', enum: Rol, default: Rol.USER })
    rol: Rol;

    @CreateDateColumn()
    creationDate: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}