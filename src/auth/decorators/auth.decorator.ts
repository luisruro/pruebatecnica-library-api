import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth/auth.guard";
import { RolesGuard } from "../guard/roles/roles.guard";
import { Rol } from "src/common/enums/role.enum";

export function Auth(roles: Rol[]) {
    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));//Applying multiple decorators at the same time @Roles and @UseGuards
}