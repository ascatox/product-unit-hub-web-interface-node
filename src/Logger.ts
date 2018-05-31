import * as winston from 'winston'
import * as moment from 'moment'

const tsFormat = () => moment().format('DD-MM-YYYY HH:mm:ss').trim();

const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true
        }),
    ]
});
logger.level = process.env.LOGGING_LEVEL || 'debug';
logger.exitOnError = false;

export { logger };