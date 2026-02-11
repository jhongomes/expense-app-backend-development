import { Injectable } from "@nestjs/common";
import { Category } from "../entity/category.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CategoryRepository extends Repository<Category> {
    constructor(private readonly dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
    }

    async findOneByCategory(user_id: string, slug: string) {
        return this.findOne({
            where: { user_id, slug },
        });
    }

    async createCategory(user_id: string, name: string, slug: string) {
        const category = this.create({
            user_id,
            name: name,
            slug,
        });

        await this.save(category);
        return category;
    }
}