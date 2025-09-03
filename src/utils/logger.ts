export type LogLevel = 'info' | 'warn' | 'error';

export class Logger {
  private mode: string;

  constructor(mode?: string) {
    if (mode) {
      this.mode = mode;
    } else if (typeof process !== 'undefined' && process.env.NODE_ENV) {
      this.mode = process.env.NODE_ENV;
    } else {
      this.mode = 'development';
    }
  }

  private formatMessage(level: LogLevel, message: string, meta?: any) {
    return `[FastUIBuilder][${level.toUpperCase()}] ${message}${
      meta ? ' ' + JSON.stringify(meta) : ''
    }`;
  }

  info(message: string, meta?: any) {
    if (this.mode === 'development') {
      console.info(this.formatMessage('info', message, meta));
    }
  }

  warn(message: string, meta?: any) {
    if (this.mode === 'development' || this.mode === 'test') {
      console.warn(this.formatMessage('warn', message, meta));
    }
  }

  error(message: string, meta?: any) {
    console.error(this.formatMessage('error', message, meta));
  }

  // Optional: toggle logging completely
  isEnabled(level: LogLevel) {
    if (level === 'error') return true; // always log errors
    return this.mode === 'development';
  }
}

// singleton instance
export const logger = new Logger();