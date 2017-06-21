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


    static wordpressApi;

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

        this.wordpressApi = new WPAPI({
            endpoint: this.wordpressUrl + 'index.php/wp-json'
        });

		this.cognitoToken = null;

		if (AWS.Config.credentials && AWS.Config.credentials.params && AWS.Config.credentials.params.Logins) {
			const loginKeys = Object.keys(AWS.Config.credentials.params.Logins);
			if (loginKeys.length > 0) {
				this.cognitoToken = AWS.Config.credentials.params.Logins[loginKeys[0]];
			}
		}

        // register custom routes
        WordpressTemplateService.wordpressApi.headerFooter = WordpressTemplateService.wordpressApi.registerRoute('flowfact/v1', '/beaverbuilder/headerfooter');
        WordpressTemplateService.wordpressApi.template = WordpressTemplateService.wordpressApi.registerRoute('flowfact/v1', '/template');
    }

    static getPageUrl(templateId, companyId)
    {
        return WordpressTemplateService.wordpressUrl + companyId + '/' + templateId;
    }

    /**
     * Create a site by an specific name. The page published directly.
     *
     * @param siteName 		The title of the new wordpress page
     * @param templateId	The id of the template, which will be the title of the page aswell.
     *
     */
    static createSite(siteName, templateId) {
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

    static deleteSite(templateId) {
        if (this.cognitoToken) {
			return WordpressTemplateService.wordpressApi.pages().slug(templateId).param('cognitoToken', this.cognitoToken).then(page => {
				if (page !== []) {
					console.log('page');
					return WordpressTemplateService.wordpressApi.pages().id(page.id).param('cognitoToken', this.cognitoToken).delete();
				}
				console.log('no page');
				return false;
			});
        }
		console.log('no cognitoToken');
		return false;
    }

    static getHeaderFooterData() {
        return WordpressTemplateService.wordpressApi.headerFooter().headerfooter();
    }

    static updateHeaderFooter(headerId, footerId) {
        WordpressTemplateService.wordpressApi.headerFooter().headerfooter().update({
            headerPageId: headerId,
            footerPageId: footerId
        });
    }
}
