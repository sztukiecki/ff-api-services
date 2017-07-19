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

            this.cognitoToken = null;

            if (AWS.Config.credentials && AWS.Config.credentials.params && AWS.Config.credentials.params.Logins) {
                var loginKeys = Object.keys(AWS.Config.credentials.params.Logins);
                if (loginKeys.length > 0) {
                    this.cognitoToken = AWS.Config.credentials.params.Logins[loginKeys[0]];
                }
            }
        }
    }, {
        key: 'getPageUrl',
        value: function getPageUrl(templateId, companyId) {
            return WordpressTemplateService.wordpressUrl + companyId + '/' + templateId;
        }

        /**
         * Create a site by a specific name. The page is published directly.
         *
         * @param companyId 	The company of the current user scope, which is also the blog name for the wordpress api
         * @param pageTitle 	The title of the new WordPress page
         * @param templateId	The id of the template, which will be the title of the page aswell.
         *
         */

    }, {
        key: 'createPage',
        value: function createPage(companyId, pageTitle, templateId) {
            if (this.cognitoToken) {
                var wordpressApi = this.getWordpressApi(companyId);
                return wordpressApi.pages().param('cognitoToken', this.cognitoToken).create({
                    title: pageTitle,
                    slug: templateId,
                    status: 'publish',
                    type: 'page'
                });
            }
            return false;
        }

        /**
         * Duplicate an existing wordpress page.
         * A wordpress template is directly connected to the template service. Any reference to "template",
         * like "template id", means the corresponding attribute from the <b>template service</b>.
         *
         * A wordpress template, without a corresponding template from the template service, can not be rendered or manipulated.
         *
         * @param companyId         The company, to create the page for.
         * @param oldTemplateId     The id of the template, which shall be duplicated
         * @param newTemplateId     The id of the newly created template.
         * @returns {*}
         */

    }, {
        key: 'duplicatePage',
        value: function duplicatePage(companyId, oldTemplateId, newTemplateId) {
            if (this.cognitoToken) {
                var wordpressApi = this.getWordpressApi(companyId);
                return wordpressApi.duplicatePage().param('cognitoToken', this.cognitoToken).param('oldTemplateId', oldTemplateId).param('newTemplateId', newTemplateId);
            }
            return false;
        }

        /**
         * Delete a site with a specific name.
         *
         * @param companyId 	The company of the current user scope, which is also the blog name for the wordpress api
         * @param templateId 	The slug of the WordPress page
         *
         */

    }, {
        key: 'deletePage',
        value: function deletePage(companyId, templateId) {
            var _this = this;

            if (this.cognitoToken) {
                var wordpressApi = this.getWordpressApi(companyId);
                return wordpressApi.pages().slug(templateId).param('cognitoToken', this.cognitoToken).then(function (pages) {
                    if (pages.length > 0) {
                        var page = pages.shift();
                        return wordpressApi.pages().id(page.id).param('cognitoToken', _this.cognitoToken).delete();
                    }
                    return false;
                });
            }
            return false;
        }

        /**
         * Generates the blog specific WordPress API enpoints and returns them
         *
         * @param companyId The company of the current user scope, which is also the blog name for the wordpress api
         * @returns {WPAPI}
         */

    }, {
        key: 'getWordpressApi',
        value: function getWordpressApi(companyId) {

            if (!(companyId in this.wordpressApis)) {

                this.wordpressApis[companyId] = new WPAPI({
                    endpoint: '' + this.wordpressUrl + companyId + '/index.php/wp-json'
                });
                this.wordpressApis[companyId].duplicatePage = this.wordpressApis[companyId].registerRoute('wp/v2', '/pages/duplicate');
            }

            return this.wordpressApis[companyId];
        }
    }]);

    return WordpressTemplateService;
}(), _class.storeKeys = {
    StageName: 'HTTPCLIENT.APICLIENT.STAGE',
    VersionTagName: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
}, _class.defaultStage = 'staging', _class.defaultVersionTag = 'stable', _class.wordpressApis = [], _temp);
export { WordpressTemplateService as default };