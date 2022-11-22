import { ConfigService } from '@nestjs/config';
import { isEqual } from 'lodash';
import { AdvancedConsoleLogger, Logger, QueryRunner } from 'typeorm';

/**
 * @name CustomTypeOrmLogger
 * @implements Logger
 * @description >
 *      Class which takes the basic functions of Log Typeorm
 *      but which applies them only when the environment variable allows it
 */
export class CustomTypeOrmLogger implements Logger {
    constructor(private configService: ConfigService, private advancedConsoleLogger: AdvancedConsoleLogger) {}

    private isLogEnabled = this.configService.get('logs.orm');

    /**
     * @name logQuery
     * @description Logs query and parameters used in it.
     * @param {string} query
     * @param {any[]} [parameters]
     * @param {QueryRunner} [queryRunner]
     * @returns {*}
     */
    public logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        if (this.isLogEnabled) {
            return this.advancedConsoleLogger.logQuery(query, parameters, queryRunner);
        }
    }

    /**
     * @name logQueryError
     * @description Logs query that is failed.
     * @param {string} error
     * @param {string} query
     * @param {any[]} [parameters]
     * @param {QueryRunner} [queryRunner]
     * @returns {*}
     */
    public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        if ((!this.isLogEnabled && String(error).includes('constraints')) || this.isLogEnabled) {
            return this.advancedConsoleLogger.logQueryError(error, query, parameters, queryRunner);
        }
    }

    /**
     * @name logQuerySlow
     * @description Logs query that is slow.
     * @param {number} time
     * @param {string} query
     * @param {any[]} [parameters]
     * @param {QueryRunner} [queryRunner]
     * @returns {*}
     */
    public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        return this.advancedConsoleLogger.logQuerySlow(time, query, parameters, queryRunner);
    }

    /**
     * @name logSchemaBuild
     * @description Logs events from the schema build process.
     * @param {string} message
     * @param {QueryRunner} [queryRunner]
     * @returns {*}
     */
    public logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        if (this.isLogEnabled) {
            return this.advancedConsoleLogger.logSchemaBuild(message, queryRunner);
        }
    }

    /**
     * @name logMigration
     * @description Logs events from the migration run process.
     * @param {string} message
     * @param {QueryRunner} [queryRunner]
     * @returns {*}
     */
    public logMigration(message: string, queryRunner?: QueryRunner): any {
        if (this.isLogEnabled) {
            return this.advancedConsoleLogger.logMigration(message, queryRunner);
        }
    }

    /**
     * @name log
     * @description >
     *      Perform logging using given logger, or by default to the console.
     *      Log has its own level and message.
     * @param {('log' | 'info' | 'warn')} level
     * @param {*} message
     * @param {QueryRunner} [queryRunner]
     * @returns {*}
     */
    public log(level: 'log' | 'info' | 'warn', message: unknown, queryRunner?: QueryRunner): unknown {
        if (this.isLogEnabled || (!this.isLogEnabled && isEqual(level, 'warn'))) {
            return this.advancedConsoleLogger.log(level, message, queryRunner);
        }
    }
}
