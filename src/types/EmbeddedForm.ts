export interface ProgressData {
    name: string;
    position: number;
};

export interface ProgressDataWithWidth extends ProgressData {
    width: number;
};

export interface PageNameAndDesc {
    name: string;
    description?: string;
}