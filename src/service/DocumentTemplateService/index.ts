import { TemplateController } from './TemplateController';
import { CategoriesController } from './CategoriesController';

export * from './DocumentTemplateService.Types';

export class DocumentTemplateService {

    public readonly template: TemplateController;
    public readonly categories: CategoriesController;

    constructor() {
        this.template = new TemplateController();
        this.categories = new CategoriesController();
    }

}

export const DocumentTemplateServiceInstance = new DocumentTemplateService();
