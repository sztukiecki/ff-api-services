import Phase from './Phase';

export default interface Flywheel {
    name: string;
    captions: Record<string, string>;
    phases: Phase[];
}
