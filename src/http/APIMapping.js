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
    entityService: new APIMappingClass('entity-service'),
    schemaService: new APIMappingClass('schema-service'),
    tagService: new APIMappingClass('tag-service'),
    templateService: new APIMappingClass('template-service'),
    funnelService: new APIMappingClass('funnel-service'),
    presetService: new APIMappingClass('preset-service'),
    activityService: new APIMappingClass('activity-service'),
    entityExportService: new APIMappingClass('entity-export-service'),
    searchService: new APIMappingClass('search-service'),
    formService: new APIMappingClass('form-service'),
    componentService: new APIMappingClass('component-ui-service'),
    geolocationService: new APIMappingClass('geolocation-service'),
    emailService: new APIMappingClass('email-service'),
    viewDefinitionService: new APIMappingClass('view-definition-service'),
    relogService: new APIMappingClass('relog-service')
};

export default APIMapping;
export {APIMappingClass};
