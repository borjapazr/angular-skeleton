/**
 * Simple logger system with the possibility of registering custom outputs.
 *
 * 4 different log levels are provided, with corresponding methods:
 * - DEBUG   : for debug information
 * - INFO    : for informative status of the application (success, ...)
 * - WARNING : for non-critical errors that do not prevent normal application behavior
 * - ERROR   : for critical errors that prevent normal application behavior
 *
 * Example usage:
 * ```
 * import { Logger } from '@core/services/logger.service';
 *
 * const LOGGER = new Logger('myFile');
 * ...
 * logger.debug('something happened');
 * ```
 *
 * If you want to process logs through other outputs than console, you can add LogOutput functions to Logger.outputs.
 */

enum LogLevel {
  OFF = 0,
  ERROR = 1,
  WARNING = 2,
  INFO = 3,
  DEBUG = 4
}

type LogOutput = (source: string | undefined, level: LogLevel, ...objects: any[]) => void;

class Logger {
  static level = LogLevel.DEBUG;

  static outputs: LogOutput[] = [];

  constructor(private source?: string) {}

  static enableProductionMode() {
    Logger.level = LogLevel.WARNING;
  }

  debug(...objects: any[]) {
    this.log(console.log, LogLevel.DEBUG, objects);
  }

  info(...objects: any[]) {
    this.log(console.info, LogLevel.INFO, objects);
  }

  warn(...objects: any[]) {
    this.log(console.warn, LogLevel.WARNING, objects);
  }

  error(...objects: any[]) {
    this.log(console.error, LogLevel.ERROR, objects);
  }

  private log(func: (...args: any[]) => void, level: LogLevel, objects: any[]) {
    if (level <= Logger.level) {
      const log = this.source ? ['[' + this.source + ']'].concat(objects) : objects;
      func.apply(console, log);
      Logger.outputs.forEach(output => output.apply(output, [this.source, level, ...objects]));
    }
  }
}

export { Logger, LogLevel, LogOutput };
