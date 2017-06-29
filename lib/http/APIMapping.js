var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var APIMappingClass = function () {
    function APIMappingClass(name) {
        _classCallCheck(this, APIMappingClass);

        this.serviceName = name;
    }

    _createClass(APIMappingClass, [{
        key: 'name',
        get: function get() {
            return this.serviceName;
        }
    }]);

    return APIMappingClass;
}();

var APIMapping = {
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
    viewDefinitionService: new APIMappingClass('view-definition-service')
};
export default APIMapping;
export { APIMappingClass };