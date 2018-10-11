import {AxiosConfig} from './APIClient';

export class APIService {
    constructor(private readonly serviceName: string, private readonly configuration?: AxiosConfig) {
        this.serviceName = serviceName;
        this.configuration = configuration;
    }

    get name() {
        return this.serviceName;
    }

    /*
     * The Axios Configuration Object.
     */
    get axiosConfiguration() {
        return this.configuration;
    }
}

const APIMapping = {
    userService: new APIService('user-service'),
    flowfactExporterInternalService: new APIService('flowfact-exporter-internal-service'),
    contactService: new APIService('contact-service'),
    commissionCalculationService: new APIService('commission-calculation-service'),
    companyService: new APIService('company-service'),
    entityService: new APIService('entity-service'),
    cognitoClientService: new APIService('cognito-client-service'),
    schemaService: new APIService('schema-service'),
    tagService: new APIService('tag-service'),
    taggingService: new APIService('tagging-service'),
    templateService: new APIService('template-service'),
    funnelService: new APIService('funnel-service'),
    presetService: new APIService('preset-service'),
    agentRecommendationService: new APIService('agent-recommendation-service'),
    entityExportService: new APIService('entity-export-service'),
    searchService: new APIService('search-service'),
    searchProfileService: new APIService('searchprofile-service'),
    fullTextSearchService: new APIService('full-text-search-service'),
    formService: new APIService('form-service'),
    componentService: new APIService('component-ui-service'),
    geolocationService: new APIService('geolocation-service'),
    emailService: new APIService('email-service'),
    adminTokenService: new APIService('admin-token-service'),
    viewDefinitionService: new APIService('view-definition-service'),
    relogService: new APIService('relog-service'),
    multimediaService: new APIService('multimedia-service'),
    interactiveExposeService: new APIService('interactive-expose-service'),
    interactiveExposeDeliveryService: new APIService('interactive-expose-delivery-service'),
    interactiveExposeStatisticsService: new APIService('interactive-expose-statistics-service'),
    moduleService: new APIService('module-service'),
    sampleDataService: new APIService('sampledata-service'),
    slackIntegrationService: new APIService('slack-integration-service'),
    spregnetterService: new APIService('sprengnetter-service'),
    propertyMarketingPhaseService: new APIService('property-marketing-phase-service'),
    portalManagementService: new APIService('portal-management-service'),
    office365AuthenticationService: new APIService('office365-authentication-service'),
    customerLegitimationArchiveService: new APIService("customer-legitimation-archive-service"),
    gdprService: new APIService("gdpr-service")
};

export default APIMapping;