import CompanyService from './service/CompanyService';
import UserService from './service/UserService';
import SchemaService from './service/SchemaService';
import TagsService from './service/TagsService';
import FunnelService from './service/FunnelService';
import GeolocationService from './service/GeolocationService';
import PresetService from './service/PresetService';
import ActivityService from './service/ActivityService';
import SearchService from './service/SearchService';
import TemplateService from './service/TemplateService';
import WordpressTemplateService from './service/WordpressTemplateService';
import FormService from './service/FormService';
import EmailService from './service/EmailService';
import ComponentService from './service/ComponentService';
import ViewDefinitionService from './service/ViewDefinitionService';
import HTTPProvider from './component/HTTPProvider';
import EntityService from './service/EntityService';
import ErrorHandler from './ErrorHandler';

export default HTTPProvider;

export { CompanyService, UserService, TemplateService, TagsService, SchemaService, FunnelService, GeolocationService, PresetService, ActivityService, SearchService, WordpressTemplateService, FormService, EmailService, ComponentService, ViewDefinitionService, EntityService, ErrorHandler };