import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Contact, ContactGroupResponse, SearchResultOfContact } from '@flowfact/types';

export class ContactService extends APIClient {

    constructor() {
        super(APIMapping.contactService);
    }

    /**
     * TODO: Please comment this method
     * @param email
     * @param firstName
     * @param lastName
     */
    async fetchContact(email: string, firstName?: string, lastName?: string): Promise<AxiosResponse<Contact>> {
        return this.invokeApi('/contact', 'GET', undefined, {
            queryParams: { email, firstName, lastName }
        });
    }

    /**
     * TODO: Please comment this method
     * @param contact
     */
    async createContact(contact: Contact): Promise<AxiosResponse<string>> {
        return this.invokeApi('/contact', 'POST', contact);
    }

    /**
     * TODO: Please comment this method
     * @param contact
     * @param schemaId
     */
    async createContactInSpecificSchema(contact: Contact, schemaId: string): Promise<AxiosResponse<string>> {
        return this.invokeApi(`/contact/schema/${schemaId}`, 'POST', contact);
    }

    /**
     * TODO: Please comment this method
     * @param contact
     */
    async updateContact(contact: Contact): Promise<AxiosResponse<Contact>> {
        return this.invokeApi('/contact', 'PUT', contact);
    }

    /**
     * TODO: Please comment this method
     * @param id
     * @param contact
     */
    async updateContactById(id: string, contact: Contact): Promise<AxiosResponse<Contact>> {
        return this.invokeApi(`/contact/${id}`, 'PUT', contact);
    }

    /**
     * TODO: Please comment this method
     * @param contact
     * @param id
     * @param schemaId
     */
    async updateContactByIdInSpecificSchema(contact: Contact, id: string, schemaId: string): Promise<AxiosResponse<string>> {
        return this.invokeApi(`/contact/schema/${schemaId}/${id}`, 'POST', contact);
    }

    /**
     * TODO: Please comment this method
     * @param email
     * @param firstName
     * @param lastName
     */
    async fetchContactGroup(email: string, firstName?: string, lastName?: string): Promise<AxiosResponse<ContactGroupResponse>> {
        return this.invokeApi('/contact', 'GET', undefined, {
            queryParams: { email, firstName, lastName }
        });
    }

    /**
     * TODO: Please comment this method
     * @param id
     */
    async fetchContactById(id: string): Promise<AxiosResponse<Contact>> {
        return this.invokeApi(`/contact/${id}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param id
     * @param schemaId
     */
    async fetchContactByIdInSpecificSchema(id: string, schemaId: string): Promise<AxiosResponse<Contact>> {
        return this.invokeApi(`/contact/schema/${schemaId}/${id}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param id
     */
    async deleteContactById(id: string): Promise<AxiosResponse<any>> {
        return this.invokeApi(`/contact/${id}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     * @param id
     * @param schemaId
     */
    async deleteContactByIdInSpecificSchema(id: string, schemaId: string): Promise<AxiosResponse<any>> {
        return this.invokeApi(`/contact/schema/${schemaId}/${id}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     * @param flowDsl
     * @param maxContacts
     */
    async searchForContactsWithCustomSearch(flowDsl: any, maxContacts: number): Promise<AxiosResponse<SearchResultOfContact>> {
        return this.invokeApi('/contact/customSearch', 'POST', flowDsl, { queryParams: { maxContacts } });
    }

    /**
     * TODO: Please comment this method
     * @param flowDsl
     * @param schemaId
     * @param maxContacts
     */
    async searchForContactsInSpecificShemaWithCustomSearch(flowDsl: any, schemaId: string, maxContacts: number): Promise<AxiosResponse<SearchResultOfContact>> {
        return this.invokeApi(`/contact/schema/${schemaId}/customSearch`, 'POST', flowDsl, { queryParams: { maxContacts } });
    }

    /**
     * TODO: Please comment this method
     * @param pastedAddress
     */
    async parsePastedAddress(pastedAddress: string): Promise<AxiosResponse<Contact>> {
        return this.invokeApi('/parse', 'POST', pastedAddress, { headers: { 'Content-Type': 'text/plain' } });
    }
}

export default new ContactService();
