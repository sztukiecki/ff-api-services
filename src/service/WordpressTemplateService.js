import AWS from 'ff-aws-sdk';
import store from 'store';
import WPAPI from 'wpapi';

export default class WordpressTemplateService {

    static storeKeys = {
        StageName: 'HTTPCLIENT.APICLIENT.STAGE',
        VersionTagName: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
    };

    static defaultStage = 'staging';
    static defaultVersionTag = 'stable';


    static wordpressApis = [];

    static wordpressUrl;

    static cognitoToken;

    static init() {
        let stage = store.get(this.storeKeys.StageName),
            versionTag = store.get(this.storeKeys.VersionTagName);

        stage = stage ? stage : this.defaultStage;

        // There is no concept on how to implement the version into the beaverbuilder right now.
        // Technically both versions are already implemented
        versionTag = versionTag ? versionTag : this.defaultVersionTag;

        this.wordpressUrl = 'https://templatingengine.' + stage + '.flowfact.cloud/';

		this.cognitoToken = null;

		if (AWS.Config.credentials && AWS.Config.credentials.params && AWS.Config.credentials.params.Logins) {
			const loginKeys = Object.keys(AWS.Config.credentials.params.Logins);
			if (loginKeys.length > 0) {
				this.cognitoToken = AWS.Config.credentials.params.Logins[loginKeys[0]];
			}
		}
    }

    static getPageUrl(templateId, companyId)
    {
        return this.wordpressUrl + companyId + '/' + templateId;
    }

    /**
     * Create a site by a specific name. The page is published directly.
     *
     * @param companyId 	The company of the current user scope, which is also the blog name for the wordpress api
     * @param pageTitle 	The title of the new WordPress page
     * @param templateId	The id of the template, which will be the title of the page aswell.
     *
     */
    static createPage(companyId, pageTitle, templateId) {
        if (this.cognitoToken) {
            const wordpressApi = this.getWordpressApi(companyId);
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
     * Delete a site with a specific name.
     *
     * @param companyId 	The company of the current user scope, which is also the blog name for the wordpress api
     * @param templateId 	The slug of the WordPress page
     *
     */
    static deletePage(companyId, templateId) {
        if (this.cognitoToken) {
            const wordpressApi = this.getWordpressApi(companyId);
			return wordpressApi.pages().slug(templateId).param('cognitoToken', this.cognitoToken).then(page => {
				if (page.length > 0) {
                    page = page.shift();
					return wordpressApi.pages().id(page.id).param('cognitoToken', this.cognitoToken).delete();
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
    static getWordpressApi(companyId) {

        if (!(companyId in this.wordpressApis)) {

            this.wordpressApis[companyId] = new WPAPI({
                endpoint: `${this.wordpressUrl}${companyId}/index.php/wp-json`
            });
        }

        return this.wordpressApis[companyId];
    }
}
