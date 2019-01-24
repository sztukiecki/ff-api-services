import APIClient from './http/APIClient';
import AdminTokenService from './service/AdminTokenService';
import AgentRecommendationService from './service/AgentRecommendationService';
import AppointmentBookingService from './service/AppointmentBookingService';
import CognitoClientService from './service/CognitoClientService';
import CognitoService from './service/CognitoService';
import CommissionCalculationService from './service/CommissionCalculationService';
import CompanyService from './service/CompanyService';
import ContactService from './service/ContactService';
import CsvImportService from './service/CsvImportService';
import CustomerLegitimationArchiveService from './service/CustomerLegitimationArchiveService';
import DynamicLayoutService from './service/DynamicLayoutService';
import EmailService from './service/EmailService';
import EntityService from './service/EntityService';
import FlowfactExportInternalService from './service/FlowfactExportInternalService';
import FormService from './service/FormService';
import FullTextSearchService from './service/FullTextSearchService';
import FunnelService from './service/FunnelService';
import GDPRService from './service/GDPRService';
import GeolocationService from './service/GeolocationService';
import HistoryModuleService from './service/HistoryModuleService';
import InquiryService from './service/InquiryService';
import InteractiveExposeDeliveryService from './service/InteractiveExposeDeliveryService';
import InteractiveExposeService from './service/InteractiveExposeService';
import InteractiveExposeStatisticsService from './service/InteractiveExposeStatisticsService';
import MatchmakingService from './service/MatchmakingService';
import ModuleService from './service/ModuleService';
import MultimediaService from './service/MultimediaService';
import NylasService from './service/NylasService';
import Office365AuthenticationService from './service/Office365AuthenticationService';
import OnboardingService from './service/OnboardingService';
import PortalManagementService from './service/PortalManagementService';
import PresetService from './service/PresetService';
import PropertyMarketingPhaseService from './service/PropertyMarketingPhaseService';
import RelogService, { FFAdditionalElkData, FFElkData } from './service/RelogService';
import SampleDataService from './service/SampleDataService';
import SchemaService from './service/SchemaService';
import SearchProfileService from './service/SearchProfileService';
import SearchService from './service/SearchService';
import SlackIntegrationService from './service/SlackIntegrationService';
import SprengnetterService from './service/SprengnetterService';
import TaggingService from './service/TaggingService';
import TagsService from './service/TagService';
import TaskService from './service/TaskService';
import TemplateService from './service/TemplateService';
import TrialLicenseService from './service/TrialLicenseService';
import UserService from './service/UserService';
import ViewDefinitionService from './service/ViewDefinitionService';
import WordpressTemplateService from './service/WordpressTemplateService';
import { InquiryCreatedMessage } from './util/searchprofile-service/InquiryCreatedMessage';
import StageConfiguration, { STORE_KEYS } from './util/StageConfiguration';

export {
	AdminTokenService,
	AgentRecommendationService,
	AppointmentBookingService,
	CognitoClientService,
	CognitoService,
	CommissionCalculationService,
	CompanyService,
	ContactService,
	CsvImportService,
	CustomerLegitimationArchiveService,
	DynamicLayoutService,
	EmailService,
	EntityService,
	FlowfactExportInternalService,
	FormService,
	FullTextSearchService,
	FunnelService,
	GDPRService,
	GeolocationService,
	HistoryModuleService,
	InquiryCreatedMessage,
	InquiryService,
	InteractiveExposeDeliveryService,
	InteractiveExposeService,
	InteractiveExposeStatisticsService,
	MatchmakingService,
	ModuleService,
	MultimediaService,
	NylasService,
	Office365AuthenticationService,
	OnboardingService,
	PortalManagementService,
	PresetService,
	PropertyMarketingPhaseService,
	RelogService,
	SampleDataService,
	SchemaService,
	SearchProfileService,
	SearchService,
	SlackIntegrationService,
	SprengnetterService,
	TaggingService,
	TagsService,
	TaskService,
	TemplateService,
	TrialLicenseService,
	UserService,
	ViewDefinitionService,
	WordpressTemplateService
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
