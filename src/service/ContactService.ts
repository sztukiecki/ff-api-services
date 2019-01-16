import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Contact, ContactGroupResponse, Schema, SearchResultOfContact } from '../util/ContactModels';

export class ContactService extends APIClient {

	constructor() {
		super(APIMapping.contactService);
	}

	getContact(email: string, firstName?: string, lastName?: string): Promise<AxiosResponse<Contact>> {
		return this.invokeApi('/contact', 'GET', undefined, {
			queryParams: { email, firstName, lastName }
		});
	}

	createContact(contact: Contact): Promise<AxiosResponse<string>> {
		return this.invokeApi('/contact', 'POST', contact);
	}

	createContactInSpecificSchema(contact: Contact, schemaId: string): Promise<AxiosResponse<string>> {
		return this.invokeApi(`/contact/schema/${schemaId}`, 'POST', contact);
	}

	updateContact(contact: Contact): Promise<AxiosResponse<Contact>> {
		return this.invokeApi('/contact', 'PUT', contact);
	}

	updateContactById(id: string, contact: Contact): Promise<AxiosResponse<Contact>> {
		return this.invokeApi(`/contact/${id}`, 'PUT', contact);
	}

	updateContactByIdInSpecificSchema(contact: Contact, id: string, schemaId: string): Promise<AxiosResponse<string>> {
		return this.invokeApi(`/contact/schema/${schemaId}/${id}`, 'POST', contact);
	}

	getContactGroup(email: string, firstName?: string, lastName?: string): Promise<AxiosResponse<ContactGroupResponse>> {
		return this.invokeApi('/contact', 'GET', undefined, {
			queryParams: { email, firstName, lastName }
		});
	}

	getContactById(id: string): Promise<AxiosResponse<Contact>> {
		return this.invokeApi(`/contact/${id}`, 'GET');
	}

	getContactByIdInSpecificSchema(id: string, schemaId: string): Promise<AxiosResponse<Contact>> {
		return this.invokeApi(`/contact/schema/${schemaId}/${id}`, 'GET');
	}

	deleteContactById(id: string): Promise<AxiosResponse<any>> {
		return this.invokeApi(`/contact/${id}`, 'DELETE');
	}

	deleteContactByIdInSpecificSchema(id: string, schemaId: string): Promise<AxiosResponse<any>> {
		return this.invokeApi(`/contact/schema/${schemaId}/${id}`, 'DELETE');
	}

	searchForContactsWithCustomSearch(flowDsl: any, maxContacts: number): Promise<AxiosResponse<SearchResultOfContact>> {
		return this.invokeApi('/contact/customSearch', 'POST', flowDsl, { queryParams: { maxContacts } });
	}

	searchForContactsInSpecificShemaWithCustomSearch(flowDsl: any, schemaId: string, maxContacts: number): Promise<AxiosResponse<SearchResultOfContact>> {
		return this.invokeApi(`/contact/schema/${schemaId}/customSearch`, 'POST', flowDsl, { queryParams: { maxContacts } });
	}

	getContactSchema(): Promise<AxiosResponse<Schema>> {
		return this.invokeApi('/contact', 'GET');
	}

	parsePastedAddress(pastedAddress: string): Promise<AxiosResponse<Schema>> {
		return this.invokeApi('/parse', 'POST', pastedAddress);
	}
}

export default new ContactService();
