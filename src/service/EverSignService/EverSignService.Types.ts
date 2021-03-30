export namespace EverSignServiceTypes {
    export interface DigitalSigner {
        name: string;
        email: string;
        entityId: string;
    }

    export interface DigitalSignatureTask {
        title: string;
        message: string;
        fileName?: string;
        fileUrl: string;
        signers: DigitalSigner[];
    }
}
