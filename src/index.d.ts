declare module 'ff-api-services' {
    export class EmailService {
        static createDomain(domain): Promise<any>;
        static verifyDomain(domain): Promise<any>;
    }
    export class ViewDefinitionService {
        static getDefinitionsForSchema(schemaId): Promise<any>
    }
}
