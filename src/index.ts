import CompanyService from './service/CompanyService';
import UserService from './service/UserService';
import SchemaService from './service/SchemaService';
import TagsService from './service/TagService';
import FunnelService from './service/FunnelService';
import GeolocationService from './service/GeolocationService';
import PresetService from './service/PresetService';
import ActivityService from './service/ActivityService';
import AgentRecommendationService from './service/AgentRecommendationService';
import SearchService from './service/SearchService';
import TemplateService from './service/TemplateService';
import WordpressTemplateService from './service/WordpressTemplateService';
import FormService from './service/FormService';
import EmailService from './service/EmailService';
import ViewDefinitionService from './service/ViewDefinitionService';
import EntityService from './service/EntityService';
import RelogService, {FFAdditionalElkData, FFElkData} from './service/RelogService';
import MyFLOWFACTService from './service/MyFLOWFACTService';
import MultimediaService from './service/MultimediaService';
import FlowfactExportInternalService from './service/FlowfactExportInternalService';
import InteractiveExposeService from './service/InteractiveExposeService';
import InteractiveExposeStatisticsService from './service/InteractiveExposeStatisticsService';
import ModuleService from './service/ModuleService';
import SampleDataService from './service/SampleDataService';
import AdminTokenService from './service/AdminTokenService';
import InteractiveExposeDeliveryService from './service/InteractiveExposeDeliveryService';
import SlackIntegrationService from './service/SlackIntegrationService';
import CognitoService from './service/CognitoService';
import APIClient from './http/APIClient';
import StageConfiguration, {STORE_KEYS} from './util/StageConfiguration';

export {
    CompanyService,
    UserService,
    TemplateService,
    TagsService,
    SchemaService,
    FunnelService,
    GeolocationService,
    PresetService,
    ActivityService,
    SearchService,
    WordpressTemplateService,
    FormService,
    EmailService,
    ViewDefinitionService,
    EntityService,
    RelogService,
    MyFLOWFACTService,
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
    AgentRecommendationService
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
    return StageConfiguration.isDefaultApi()
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