import { Injectable } from "@nestjs/common";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { Entitie } from "lib/src/enum/entities.enum";
import { User } from "src/user/entity/user.entity";

@Injectable()
export class TypeormEntityConfig {
    public static getEntitiesOf(entities): EntityClassOrSchema[] {
        const entitiesOf = {
            [Entitie.USER]: () => [User]
        };

        return entitiesOf[entities]();
    }
}