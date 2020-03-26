/**
 * There Might be even more Unknown Options. This Model comes directly from Nylas and it is not documented.
 * If a documentation for it will be added we can specify this model even further, potentially ANYTHING may be
 * possible here...
 */

export namespace NylasServiceTypes {
    export interface NylasSchedulerPage {
        slug: string;
        config: NylasSchedulerPageConfig;
        access_tokens: string[];
        app_client_id: string;
        created_at: string;
        edit_token: string;
        id: number;
        modified_at: string;
        name: string;
    }

    export interface NylasSchedulerPageConfig {
        calendar_ids: object;
        timezone: string;
        event: NylasSchedulerPageConfigEvent;
        appearance: NylasSchedulerPageConfigAppearance;
        reminders: any[];
        booking: NylasSchedulerPageConfigBooking;
    }

    export interface NylasSchedulerPageConfigEvent {
        duration: number;
        location: string;
        title: string;
    }

    export interface NylasSchedulerPageConfigAppearance {
        color: string;
        company_name: string;
        submit_text: string;
        show_nylas_branding: boolean;
        logo: string;
    }

    export interface NylasSchedulerPageConfigBooking {
        additional_fields: any[];
        available_days_in_future: number;
        confirmation_method: string;
        min_booking_notice: number;
        min_buffer: number;
        min_cancellation_notice: number;
        opening_hours: NylasSchedulerPageConfigBookingOpeningHours[];
        scheduling_method: string;
    }

    export interface NylasSchedulerPageConfigBookingOpeningHours {
        days: string[];
        start: string;
        end: string;
    }
}
