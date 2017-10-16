export default interface FileModel {
    bucketName: string;
    identifier: string;
    name: string | null;
    prefix: string;
    url: string;
}
