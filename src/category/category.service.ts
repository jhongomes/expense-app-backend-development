import { Injectable } from "@nestjs/common";
import { normalizeCategoryName } from "lib/src/validators/normalize-category-name";
import { CategoryRepository } from "./repository/category.repository";

@Injectable()
export class CategoryService {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async resolveCategory(user_id: string, rawCategory: string) {
        const slug = normalizeCategoryName(rawCategory);

        const category = await this.categoryRepository.findOneByCategory(user_id, slug);

        if (!category) {
            const createdCategory = this.categoryRepository.createCategory(
                user_id,
                rawCategory,
                slug,
            );

            return createdCategory;
        }

        return category;
    }
}
