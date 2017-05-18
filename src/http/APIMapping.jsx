class APIMappingClass {

    constructor(name) {
        this.serviceName = name;
    }

    get name() {
        return this.serviceName;
    }
}

const APIMapping = {
    userService: new APIMappingClass('user-service'),
    companyService: new APIMappingClass('company-service'),
    entitySchemaService: new APIMappingClass('schema-service'),
    tagService: new APIMappingClass('tag-service'),
    templateService: new APIMappingClass('template-service'),
    funnelService: new APIMappingClass('funnel-service'),
    presetService: new APIMappingClass('preset-service'),
    activityService: new APIMappingClass('activity-service'),
    entityExportService: new APIMappingClass('entity-export-service'),
    searchService: new APIMappingClass('search-service'),
    formService: new APIMappingClass('form-service')
};
export default APIMapping;
export {APIMappingClass};