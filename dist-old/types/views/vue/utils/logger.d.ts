export type LogLevel = 'info' | 'warn' | 'error';
export declare class Logger {
    private mode;
    constructor(mode?: string);
    private formatMessage;
    info(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    error(message: string, meta?: any): void;
    isEnabled(level: LogLevel): boolean;
}
export declare const logger: Logger;
