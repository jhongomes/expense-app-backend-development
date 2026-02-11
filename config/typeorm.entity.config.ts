import { Injectable } from "@nestjs/common";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { Entitie } from "lib/src/enum/entities.enum";
import { Category } from "src/category/entity/category.entity";
import { Expense } from "src/expense/entity/expense.entity";
import { User } from "src/user/entity/user.entity";

@Injectable()
export class TypeormEntityConfig {
    public static getEntitiesOf(entities): EntityClassOrSchema[] {
        const entitiesOf = {
            [Entitie.USER]: () => [User],
            [Entitie.EXPENSE]: () => [Expense],
            [Entitie.CATEGORY]: () => [Category]
        };

        return entitiesOf[entities]();
    }
}