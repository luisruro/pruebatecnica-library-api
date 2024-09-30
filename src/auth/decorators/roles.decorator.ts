import { SetMetadata } from "@nestjs/common";
import { Rol } from "../enums/role.enum";

export const ROLES_KEY = "roles";
export const Roles = (rol: Rol) => SetMetadata(ROLES_KEY, rol)