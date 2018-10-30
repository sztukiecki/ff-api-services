import APIClient from './http/APIClient';
import AdminTokenService from './service/AdminTokenService';
import AgentRecommendationService from './service/AgentRecommendationService';
import CognitoClientService from './service/CognitoClientService';
import CognitoService from './service/CognitoService';
import CommissionCalculationService from './service/CommissionCalculationService';
import CompanyService from './service/CompanyService';
import ContactService from './service/ContactService';
import EmailService from './service/EmailService';
import EntityService from './service/EntityService';
import FlowfactExportInternalService from './service/FlowfactExportInternalService';
import FormService from './service/FormService';
import FullTextSearchService from './service/FullTextSearchService';
import FunnelService from './service/FunnelService';
import GeolocationService from './service/GeolocationService';
import InteractiveExposeDeliveryService from './service/InteractiveExposeDeliveryService';
import InteractiveExposeService from './service/InteractiveExposeService';
import InteractiveExposeStatisticsService from './service/InteractiveExposeStatisticsService';
import ModuleService from './service/ModuleService';
import MultimediaService from './service/MultimediaService';
import Office365AuthenticationService from './service/Office365AuthenticationService';
import PortalManagementService from './service/PortalManagementService';
import PresetService from './service/PresetService';
import PropertyMarketingPhaseService from './service/PropertyMarketingPhaseService';
import RelogService, {FFAdditionalElkData, FFElkData} from './service/RelogService';
import SampleDataService from './service/SampleDataService';
import SchemaService from './service/SchemaService';
import SearchProfileService from './service/SearchProfileService';
import SearchService from './service/SearchService';
import SlackIntegrationService from './service/SlackIntegrationService';
import SprengnetterService from './service/SprengnetterService';
import TagsService from './service/TagService';
import TaggingService from './service/TaggingService';
import TemplateService from './service/TemplateService';
import UserService from './service/UserService';
import ViewDefinitionService from './service/ViewDefinitionService';
import WordpressTemplateService from './service/WordpressTemplateService';
import StageConfiguration, {STORE_KEYS} from './util/StageConfiguration';
import CustomerLegitimationArchiveService from './service/CustomerLegitimationArchiveService';
import GDPRService from './service/GDPRService';
import AppointmentBookingService from './service/AppointmentBookingService';
import TrialLicenseService from './service/TrialLicenseService';
import MatchmakingService from './service/MatchmakingService';

export {
	CompanyService,
	UserService,
	ContactService,
	CognitoClientService,
	CommissionCalculationService,
	TemplateService,
	TagsService,
	TaggingService,
	SchemaService,
	FunnelService,
	GeolocationService,
	PresetService,
	SearchService,
	WordpressTemplateService,
	FormService,
	EmailService,
	ViewDefinitionService,
	EntityService,
	RelogService,
	MultimediaService,
	FlowfactExportInternalService,
	InteractiveExposeService,
	InteractiveExposeStatisticsService,
	ModuleService,
	SampleDataService,
	InteractiveExposeDeliveryService,
	AdminTokenService,
	SlackIntegrationService,
	CognitoService,
	AgentRecommendationService,
	FullTextSearchService,
	SprengnetterService,
	PropertyMarketingPhaseService,
	PortalManagementService,
	Office365AuthenticationService,
	SearchProfileService,
	CustomerLegitimationArchiveService,
	GDPRService,
	AppointmentBookingService,
    TrialLicenseService,
    MatchmakingService
};

// types only
export {
	FFElkData,
	FFAdditionalElkData
};

const StoreKeys = STORE_KEYS;

const getStageFromStore = () => {
	return StageConfiguration.getStageFromStore();
};

const getVersionTagFromStore = () => {
	return StageConfiguration.getVersionTagFromStore();
};

const setStageInStore = (stage: string) => {
	StageConfiguration.setStageInStore(stage);
};

const setVersionTagInStore = (versionTag: string) => {
	StageConfiguration.setVersionTagInStore(versionTag);
};

const isDefaultApi = () => {
	return StageConfiguration.isDefaultApi();
};

export {
	APIClient,
	StoreKeys,
	isDefaultApi,
	setStageInStore,
	getStageFromStore,
	setVersionTagInStore,
	getVersionTagFromStore
};