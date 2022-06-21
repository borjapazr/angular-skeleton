import { Logger, LogLevel, LogOutput } from './logger.service';

const logMethods = ['log', 'info', 'warn', 'error'];

describe('Core -> Logger', () => {
  let savedConsole: any[];
  let savedLevel: LogLevel;
  let savedOutputs: LogOutput[];

  beforeAll(() => {
    savedConsole = [];
    logMethods.forEach((m: any) => {
      savedConsole[m] = console[m as keyof Console];
      console[m as keyof Console] = jest.fn();
    });
    savedLevel = Logger.level;
    savedOutputs = Logger.outputs;
  });

  beforeEach(() => {
    Logger.level = LogLevel.DEBUG;
  });

  afterAll(() => {
    logMethods.forEach((m: any) => {
      console[m as keyof Console] = savedConsole[m];
    });
    Logger.level = savedLevel;
    Logger.outputs = savedOutputs;
  });

  it('should create an instance', () => {
    expect(new Logger()).toBeTruthy();
  });

  it('should add a new LogOutput and receives log entries', () => {
    const outputSpy = jest.fn();
    const log = new Logger('test');

    Logger.outputs.push(outputSpy);

    log.debug('d');
    log.info('i');
    log.warn('w');
    log.error('e', { error: true });

    expect(outputSpy).toHaveBeenCalled();
    expect(outputSpy.mock.calls).toHaveLength(4);
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.DEBUG, 'd');
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.INFO, 'i');
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.WARNING, 'w');
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.ERROR, 'e', { error: true });
  });

  it('should add a new LogOutput and receives only production log entries', () => {
    // Arrange
    const outputSpy = jest.fn();
    const log = new Logger('test');

    Logger.outputs.push(outputSpy);
    Logger.enableProductionMode();

    log.debug('d');
    log.info('i');
    log.warn('w');
    log.error('e', { error: true });

    expect(outputSpy).toHaveBeenCalled();
    expect(outputSpy.mock.calls).toHaveLength(2);
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.WARNING, 'w');
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.ERROR, 'e', { error: true });
  });
});
