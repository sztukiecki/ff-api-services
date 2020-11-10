import { APIClient, APIMapping } from '../../http';

import { EmailServiceTypes } from './EmailService.Types';

/**
 * REWORK OF THIS SERVICE IS NOT DONE YET!!!!
 * Need to define controller
 */
export class EmailService extends APIClient {
    constructor() {
        super(APIMapping.emailService);
    }

    /**
     * TODO: Please comment this method
     * @param domain
     */
    createDomain(domain: string) {
        return this.invokeApiWithErrorHandling<EmailServiceTypes.DomainConfigurationResponse>('/configuration/whitelabel', 'POST', { domain });
    }

    /**
     * TODO: Please comment this method
     * @param domain
     */
    verifyDomain(domain: string) {
        return this.invokeApiWithErrorHandling<EmailServiceTypes.DomainConfigurationResponse>('/configuration/whitelabel/verify', 'POST', { domain });
    }

    /**
     * TODO: Please comment this method
     * @param s3Key
     */
    fetchMailBody(s3Key: string) {
        return this.invokeApiWithErrorHandling<string>('/body/html', 'GET', undefined, {
            queryParams: {
                s3key: s3Key,
            },
        });
    }

    sendMail(mail: EmailServiceTypes.Email) {
        const formData = new FormData();
        formData.append('model', JSON.stringify(mail));
        return this.invokeApiWithErrorHandling('/mails/html', 'POST', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    /**
     * Sync a mail manually into the platform
     * @param emailAccount
     * @param subject
     */
    syncEmail(emailAccount: string, subject: string) {
        return this.invokeApiWithErrorHandling('/emails/sync', 'POST', {
            emailAccount: emailAccount,
            subject: subject,
        });
    }

    notify(template: EmailServiceTypes.EmailTemplate, recipients: EmailServiceTypes.EmailRecipient | EmailServiceTypes.EmailRecipient[]) {
        return this.invokeApiWithErrorHandling('/notifications', 'POST', {
            recipientGroup: Array.isArray(recipients) ? recipients : [recipients],
            emailTemplate: template,
        });
    }
}

export const EmailServiceInstance = new EmailService();
