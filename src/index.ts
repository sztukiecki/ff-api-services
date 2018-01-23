import CompanyService from './service/CompanyService';
import UserService from './service/UserService';
import SchemaService from './service/SchemaService';
import TagsService from './service/TagService';
import FunnelService from './service/FunnelService';
import GeolocationService from './service/GeolocationService'
import PresetService from './service/PresetService';
import ActivityService from './service/ActivityService';
import SearchService from './service/SearchService';
import TemplateService from './service/TemplateService';
import WordpressTemplateService from './service/WordpressTemplateService';
import FormService from './service/FormService';
import EmailService from './service/EmailService';
import ViewDefinitionService from './service/ViewDefinitionService';
import EntityService from './service/EntityService';
import RelogService, {FFElkData, FFAdditionalElkData} from './service/RelogService';
import MyFLOWFACTService from './service/MyFLOWFACTService';
import MultimediaService from './service/MultimediaService';
import FlowfactExportInternalService from './service/FlowfactExportInternalService';
import CognitoService from './service/CognitoService';
import InteractiveExposeService from './service/InteractiveExposeService';
import ModuleService from './service/ModuleService';
import SampleDataService from './service/SampleDataService';
import AdminTokenService from './service/AdminTokenService';
import APIClient from './http/APIClient';
import * as store from "store";
import * as isNode from "detect-node";

const StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    EdgeServiceVersionTag: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
};

const defaultStage = isNode ? 'development' : 'production';
const defaultVersionTag = isNode ? 'latest' : 'stable';

const getStageFromStore = () => {
    return store.get(StoreKeys.EdgeServiceStage) || defaultStage;
};

const getVersionTagFromStore = () => {
    return store.get(StoreKeys.EdgeServiceVersionTag) || defaultVersionTag;
};

const setStageInStore = (stage: string) => {
    if (stage) {
        store.set(StoreKeys.EdgeServiceStage, stage);
        console.log('Set stage to: ' + stage);
    }
};

const setVersionTagInStore = (versionTag: string) => {
    if (versionTag) {
        store.set(StoreKeys.EdgeServiceVersionTag, versionTag);
        console.log('Set versionTag to: ' + versionTag);
    }
};

const isDefaultApi = () => {
    const stage = getStageFromStore();
    const versionTag = getVersionTagFromStore();
    return (stage === defaultStage) && (versionTag === defaultVersionTag);
};

export {
    StoreKeys,
    isDefaultApi,
    setStageInStore,
    getStageFromStore,
    setVersionTagInStore,
    getVersionTagFromStore
}

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
    CognitoService,
    FlowfactExportInternalService,
    InteractiveExposeService,
    ModuleService,
    SampleDataService,
    AdminTokenService
};

// types only
export {
    FFElkData,
    FFAdditionalElkData
}

export {
    APIClient
}
