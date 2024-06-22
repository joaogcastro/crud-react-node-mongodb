export class Logger {
    private levels: { [key: string]: string };

    constructor() {
        this.levels = {
            debug: 'DEBUG',
            info: 'INFO',
            warn: 'WARN',
            error: 'ERROR'
        };
    }

    private getFormattedDate(): string {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year}-${hours}:${minutes}:${seconds}`;
    }

    private log(level: string, message: string): void {
        const formattedDate = this.getFormattedDate();
        console.log(`${formattedDate} [${level}] ${message}`);
    }

    public debug(message: string): void {
        this.log(this.levels.debug, message);
    }

    public info(message: string): void {
        this.log(this.levels.info, message);
    }

    public warn(message: string): void {
        this.log(this.levels.warn, message);
    }

    public error(message: string): void {
        this.log(this.levels.error, message);
    }
}