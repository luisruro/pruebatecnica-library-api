import { SetMetadata } from "@nestjs/common";
import { Rol } from "src/common/enums/role.enum";


export const ROLES_KEY = "roles";
export const Roles = (...roles: Rol[]) => SetMetadata(ROLES_KEY, roles)//(...)it allows  decorator accepts multiple arguments, it means you can pass a lot roles as parameters @Roles(Rol.ADMIN, Rol.USER)