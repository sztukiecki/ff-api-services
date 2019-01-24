import { AxiosConfig } from './APIClient';

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
	adminTokenService: new APIService('admin-token-service'),
	agentRecommendationService: new APIService('agent-recommendation-service'),
	appointmentBookingService: new APIService('appointment-booking-service'),
	cognitoClientService: new APIService('cognito-client-service'),
	commissionCalculationService: new APIService('commission-calculation-service'),
	companyService: new APIService('company-service'),
	componentService: new APIService('component-ui-service'),
	contactService: new APIService('contact-service'),
	customerLegitimationArchiveService: new APIService('customer-legitimation-archive-service'),
	emailService: new APIService('email-service'),
	entityExportService: new APIService('entity-export-service'),
	entityService: new APIService('entity-service'),
	flowfactExporterInternalService: new APIService('flowfact-exporter-internal-service'),
	formService: new APIService('form-service'),
	fullTextSearchService: new APIService('full-text-search-service'),
	funnelService: new APIService('funnel-service'),
	gdprService: new APIService('gdpr-service'),
	geolocationService: new APIService('geolocation-service'),
	inquiryService: new APIService('inquiry-service'),
	interactiveExposeDeliveryService: new APIService('interactive-expose-delivery-service'),
	interactiveExposeService: new APIService('interactive-expose-service'),
	interactiveExposeStatisticsService: new APIService('interactive-expose-statistics-service'),
	matchmakingService: new APIService('matchmaking-service'),
	moduleService: new APIService('module-service'),
	nylasService: new APIService('nylas-service'),
	multimediaService: new APIService('multimedia-service'),
	office365AuthenticationService: new APIService('office365-authentication-service'),
	portalManagementService: new APIService('portal-management-service'),
	presetService: new APIService('preset-service'),
	propertyMarketingPhaseService: new APIService('property-marketing-phase-service'),
	relogService: new APIService('relog-service'),
	sampleDataService: new APIService('sampledata-service'),
	schemaService: new APIService('schema-service'),
	searchProfileService: new APIService('searchprofile-service'),
	searchService: new APIService('search-service'),
	slackIntegrationService: new APIService('slack-integration-service'),
	spregnetterService: new APIService('sprengnetter-service'),
	taggingService: new APIService('tagging-service'),
	tagService: new APIService('tag-service'),
	taskService: new APIService('task-entity-service'),
	templateService: new APIService('template-service'),
	trialLicenseServive: new APIService('trial-license-service'),
	userService: new APIService('user-service'),
	viewDefinitionService: new APIService('view-definition-service'),
	historyModuleService: new APIService('history-module-service'),
	onboardingService: new APIService('onboarding-service'),
	csvImportService: new APIService('csv-importer-service')
};

export default APIMapping;
