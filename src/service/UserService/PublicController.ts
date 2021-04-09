import { APIClient, APIMapping } from '../../http';
import { IdentifiedUserResponse, SSOResponse, SSOTokenResponse } from './UserService.Types';

export class PublicController extends APIClient {
    constructor() {
        super(APIMapping.userService);
    }

    /**
     * Returns the identifier (Cognito user name) for a login (can be a preferred user name, an email, or an alias).
     * For aliases the user name cannot be determined with absolute certainty and hence in the returned object
     * the [identifiersOfMatchingAliases]-field lists the matching identifiers.
     * Otherwise the [identifier]-field holds the identifier in the returned object.
     * @param loginName
     */
    async identifyUser(loginName: string) {
        return await this.invokeApiWithErrorHandling<IdentifiedUserResponse>(`/public/cognito-users/usernames/`, 'GET', undefined, {
            queryParams: {
                name: loginName,
            },
        });
    }

    /**
     * This resource checks if a user has been created by Single-Sign-On of specific kind
     * @param businessMailAddress
     * @param ssoType
     */
    async hasSsoOfType(businessMailAddress: string, ssoType: string) {
        return await this.invokeApiWithErrorHandling<boolean>('/public/users/sso', 'GET', undefined, {
            queryParams: {
                aliasMailAddress: businessMailAddress,
                ssoType: ssoType,
            },
        });
    }

    /**
     * This resource checks if a user is part of a company that is restricted to SSO
     * @param email
     */
    async hasSsoOfTypeV2(email: string) {
        return await this.invokeApiWithErrorHandling<SSOResponse>('/public/sso', 'GET', undefined, {
            queryParams: {
                username: email,
            },
        });
    }

    /**
     * This resource fetches the authentication tokens when a valid authorization code is provided
     * @param code
     * @param clientId
     * @param redirectUri
     */
    async authenticateWithSsoToken(code: string, clientId: string, redirectUri: string) {
        return await this.invokeApiWithErrorHandling<SSOTokenResponse>('/public/sso/token', 'POST', {
            code,
            clientId,
            redirectURI: redirectUri,
        });
    }

    /**
     * Checks if a mail is blocked by congito
     * 200 = when the mail address is blocked
     * 404 = when the mail address is not blocked
     * @param mailAddress
     */
    async isMailBlocked(mailAddress: string) {
        return await this.invokeApiWithErrorHandling(`/public/cognito/mailing/blocks/${mailAddress}`, 'GET');
    }

    /**
     * This resource is used to add the aliasMailAddress of a user to the email user-attribute of the given cognito-user.
     * Additional it will store the cognito-username add the user
     * @param aliasMailAddress
     */
    async linkAliasMailToCognitoUser(aliasMailAddress: string) {
        return await this.invokeApiWithErrorHandling(`/public/cognito-users/link`, 'POST', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress,
            },
        });
    }
}
