import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * @name CustomNestLogger
 * @extends Logger
 * @description >
 *      Class which takes the basic functions of nestJS log
 *      but which applies them only when the environment variable allows it
 */
export class CustomNestLogger extends ConsoleLogger {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    private logIsEnabled = this.configService.get('logs.nest');

    /**
     * @description Display the logs in the console
     * @param {string} message
     */
    public log(message: string, context: string | undefined = undefined): void {
        if (this.logIsEnabled) {
            super.log(message, context);
        }
    }

    /**
     * @description Display the errors in the console
     * @param {string} message
     * @param {string} trace
     */
    public error(message: string, trace: string, context: string | undefined = undefined): void {
        super.error(message, trace, context);
    }

    /**
     * @description Display the warnings in the console
     * @param {string} message
     */
    public warn(message: string, context: string | undefined = undefined): void {
        super.warn(message, context);
    }

    /**
     * @description Display the debugs in the console
     * @param {string} message
     */
    public debug(message: string, context: string | undefined = undefined): void {
        if (this.logIsEnabled) {
            super.debug(message, context);
        }
    }

    /**
     * @description Display the verboses in the console
     * @param {string} message
     */
    public verbose(message: string, context: string | undefined = undefined): void {
        if (this.logIsEnabled) {
            super.verbose(message, context);
        }
    }
}
