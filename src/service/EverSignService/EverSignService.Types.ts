export namespace EverSignServiceTypes {
    export interface DigitalSigner {
        name: string;
        email: string;
        entityId: string;
    }

    export interface DigitalSignatureTask {
        eversignBusinessId: string;
        eversignAccessKey: string;
        title: string;
        message: string;
        fileName?: string;
        fileUrl: string;
        signers: DigitalSigner[];
    }
}
