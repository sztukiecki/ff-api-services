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

            this.cognitoToken = null;

            if (AWS.Config.credentials && AWS.Config.credentials.params && AWS.Config.credentials.params.Logins) {
                var loginKeys = Object.keys(AWS.Config.credentials.params.Logins);
                if (loginKeys.length > 0) {
                    this.cognitoToken = AWS.Config.credentials.params.Logins[loginKeys[0]];
                }
            }

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
         * @param siteName 		The title of the new WordPress page
         * @param templateId	The id of the template, which will be the title of the page aswell.
         *
         */

    }, {
        key: 'createSite',
        value: function createSite(siteName, templateId) {
            if (this.cognitoToken) {
                return WordpressTemplateService.wordpressApi.pages().param('cognitoToken', this.cognitoToken).create({
                    title: siteName,
                    slug: templateId,
                    status: 'publish',
                    type: 'page'
                });
            }
            console.log('no cognitoToken');
            return false;
        }
    }, {
        key: 'deleteSite',
        value: function deleteSite(templateId) {
            var _this = this;

            if (this.cognitoToken) {
                return WordpressTemplateService.wordpressApi.pages().slug(templateId).param('cognitoToken', this.cognitoToken).then(function (page) {
                    if (page !== []) {
                        console.log('page');
                        return WordpressTemplateService.wordpressApi.pages().id(page.id).param('cognitoToken', _this.cognitoToken).delete();
                    }
                    console.log('no page');
                    return false;
                });
            }
            console.log('no cognitoToken');
            return false;
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