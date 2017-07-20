var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var APIService = function () {
    function APIService(serviceName, configuration) {
        _classCallCheck(this, APIService);

        this.serviceName = serviceName;
        this.configuration = configuration;
    }

    _createClass(APIService, [{
        key: 'name',
        get: function get() {
            return this.serviceName;
        }

        /*
         * The Axios Configuration Object.
         */

    }, {
        key: 'axiosConfiguration',
        get: function get() {
            return this.configuration;
        }
    }]);

    return APIService;
}();

var APIMapping = {
    userService: new APIService('user-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    companyService: new APIService('company-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    entityService: new APIService('entity-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    schemaService: new APIService('schema-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    tagService: new APIService('tag-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    templateService: new APIService('template-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    funnelService: new APIService('funnel-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    presetService: new APIService('preset-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    activityService: new APIService('activity-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    entityExportService: new APIService('entity-export-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    searchService: new APIService('search-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    formService: new APIService('form-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    componentService: new APIService('component-ui-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    geolocationService: new APIService('geolocation-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    emailService: new APIService('email-service'),
    viewDefinitionService: new APIService('view-definition-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    relogService: new APIService('relog-service', {
        'axios-retry': {
            retries: 4
        }
    }),
    myFLOWFACTService: new APIService('myflowfact-service', {
        'axios-retry': {
            retries: 4
        }
    })
};

export default APIMapping;
export { APIService };