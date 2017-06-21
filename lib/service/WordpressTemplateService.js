var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import AWS from 'ff-aws-sdk';
import store from 'store';
import WPAPI from 'wpapi';

var WordpressTemplateService = (_temp = _class = function () {
    function WordpressTemplateService() {
        _classCallCheck(this, WordpressTemplateService);
    }

    _createClass(WordpressTemplateService, null, [{
        key: 'init',
        value: function init() {
            var stage = store.get(this.storeKeys.StageName),
                versionTag = store.get(this.storeKeys.VersionTagName);

            stage = stage ? stage : this.defaultStage;

            // There is no concept on how to implement the version into the beaverbuilder right now.
            // Technically both versions are already implemented
            versionTag = versionTag ? versionTag : this.defaultVersionTag;

            this.wordpressUrl = 'https://templatingengine.' + stage + '.flowfact.cloud/';

            this.wordpressApi = new WPAPI({
                endpoint: this.wordpressUrl + 'index.php/wp-json'
            });

            // register custom routes
            WordpressTemplateService.wordpressApi.headerFooter = WordpressTemplateService.wordpressApi.registerRoute('flowfact/v1', '/beaverbuilder/headerfooter');
            WordpressTemplateService.wordpressApi.template = WordpressTemplateService.wordpressApi.registerRoute('flowfact/v1', '/template');
        }
    }, {
        key: 'getPageUrl',
        value: function getPageUrl(templateId, companyId) {
            return WordpressTemplateService.wordpressUrl + companyId + '/' + templateId;
        }

        /**
         * Create a site by an specific name. The page published directly.
         *
         * @param siteName 		The title of the new wordpress page
         * @param templateId	The id of the template, which will be the title of the page aswell.
         *
         */

    }, {
        key: 'createSite',
        value: function createSite(siteName, templateId) {
            return WordpressTemplateService.wordpressApi.pages().param('cognitoToken', AWS.Config.credentials.cognitoToken).create({
                title: siteName,
                slug: templateId,
                status: 'publish',
                type: 'page'
            });
        }
    }, {
        key: 'deleteSite',
        value: function deleteSite(id) {
            return WordpressTemplateService.wordpressApi.pages().id(id).param('cognitoToken', AWS.Config.credentials.cognitoToken).delete();
        }
    }, {
        key: 'getHeaderFooterData',
        value: function getHeaderFooterData() {
            return WordpressTemplateService.wordpressApi.headerFooter().headerfooter();
        }
    }, {
        key: 'updateHeaderFooter',
        value: function updateHeaderFooter(headerId, footerId) {
            WordpressTemplateService.wordpressApi.headerFooter().headerfooter().update({
                headerPageId: headerId,
                footerPageId: footerId
            });
        }
    }]);

    return WordpressTemplateService;
}(), _class.storeKeys = {
    StageName: 'HTTPCLIENT.APICLIENT.STAGE',
    VersionTagName: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
}, _class.defaultStage = 'staging', _class.defaultVersionTag = 'stable', _temp);
export { WordpressTemplateService as default };