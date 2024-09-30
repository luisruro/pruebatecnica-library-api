import { applyDecorators, UseGuards } from "@nestjs/common";
import { Rol } from "../enums/role.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth/auth.guard";
import { RolesGuard } from "../guard/roles/roles.guard";

export function Auth(rol: Rol) {
    return applyDecorators(Roles(rol)), UseGuards(AuthGuard, RolesGuard)
}