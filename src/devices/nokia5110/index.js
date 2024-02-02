const formatMessage = require('format-message');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const ProgramModeType = require('../../extension-support/program-mode-type');

const ArduinoPeripheral = require('../arduinoCommon/arduino-peripheral');

/**
 * The list of USB device filters.
 * @readonly
 */
const PNPID_LIST = [
    // https://github.com/arduino/Arduino/blob/1.8.0/hardware/arduino/avr/boards.txt#L51-L58
    'USB\\VID_2341&PID_0043',
    'USB\\VID_2341&PID_0001',
    'USB\\VID_2A03&PID_0043',
    'USB\\VID_2341&PID_0243',
    // For chinese clones that use CH340
    'USB\\VID_1A86&PID_7523'
];

/**
 * Configuration of serialport for Firmata
 * @readonly
 */
const SERIAL_CONFIG = {
    baudRate: 57600,
    dataBits: 8,
    stopBits: 1
};

/**
 * Configuration for arduino-cli firmata firmware.
 * @readonly
 */
const DIVECE_OPT = {
    type: 'arduino',
    fqbn: 'arduino:avr:nano:cpu=atmega328',
    firmware: 'arduinoNano.standardFirmata.ino.hex'
};

const Color = {
    black: 'BLACK',
    white: 'WHITE'
};

const Buadrate = {
    B4800: '4800',
    B9600: '9600',
    B19200: '19200',
    B38400: '38400',
    B57600: '57600',
    B76800: '76800',
    B115200: '115200'
};

const Eol = {
    Warp: 'warp',
    NoWarp: 'noWarp'
};

const DataType = {
    Integer: 'INTEGER',
    Decimal: 'DECIMAL',
    String: 'STRING'
};

/**
 * Manage communication with a Arduino Nano peripheral over a Scratch Arduino Link client socket.
 */
class Arduino extends ArduinoPeripheral {
    /**
     * Construct a Arduino communication object.
     * @param {Runtime} runtime - the Scratch Arduino runtime
     * @param {string} deviceId - the id of the extension
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor(runtime, deviceId, originalDeviceId) {
        super(runtime, deviceId, originalDeviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

/**
 * Scratch Arduino blocks to interact with a Arduino Nano peripheral.
 */
class ArduinoNokia5110Device {
    /**
     * @return {string} - the ID of this extension.
     */
    static get DEVICE_ID() {
        return 'nokia5110';
    }

    get COLOR_MENU() {
        return [
            {
                text: 'black',
                value: Color.black
            },
            {
                text: 'white',
                value: Color.white
            }
        ];
    }

    get PICTURES_MENU() {
        return [
            {
                text: 'smiley face',
                value: 'smileyFace'
            },
            {
                text: 'heart',
                value: 'heart'
            },
            {
                text: 'arrow left',
                value: 'arrowL'
            },
            {
                text: 'arrow right',
                value: 'arrowR'
            },
            {
                text: 'arrow up',
                value: 'arrowU'
            },
            {
                text: 'arrow down',
                value: 'arrowD'
            },
            {
                text: 'mushroom',
                value: 'mushroom'
            },
            {
                text: 'music',
                value: 'music'
            },
            {
                text: 'spaceship',
                value: 'spaceship'
            },
            {
                text: 'controller',
                value: 'controller'
            },
            {
                text: 'tree',
                value: 'tree'
            },
            {
                text: 'cup',
                value: 'cup'
            },
            {
                text: 'coin',
                value: 'coin'
            },
            {
                text: 'player1',
                value: 'player1'
            },
            {
                text: 'player2',
                value: 'player2'
            }
        ];
    }

    get BAUDTATE_MENU() {
        return [
            {
                text: '4800',
                value: Buadrate.B4800
            },
            {
                text: '9600',
                value: Buadrate.B9600
            },
            {
                text: '19200',
                value: Buadrate.B19200
            },
            {
                text: '38400',
                value: Buadrate.B38400
            },
            {
                text: '57600',
                value: Buadrate.B57600
            },
            {
                text: '76800',
                value: Buadrate.B76800
            },
            {
                text: '115200',
                value: Buadrate.B115200
            }
        ];
    }

    get EOL_MENU() {
        return [
            {
                text: formatMessage({
                    id: 'arduino.eolMenu.warp',
                    default: 'warp',
                    description: 'label for warp print'
                }),
                value: Eol.Warp
            },
            {
                text: formatMessage({
                    id: 'arduino.eolMenu.noWarp',
                    default: 'no-warp',
                    description: 'label for no warp print'
                }),
                value: Eol.NoWarp
            }
        ];
    }

    get DATA_TYPE_MENU() {
        return [
            {
                text: formatMessage({
                    id: 'arduino.dataTypeMenu.integer',
                    default: 'integer',
                    description: 'label for integer'
                }),
                value: DataType.Integer
            },
            {
                text: formatMessage({
                    id: 'arduino.dataTypeMenu.decimal',
                    default: 'decimal',
                    description: 'label for decimal number'
                }),
                value: DataType.Decimal
            },
            {
                text: formatMessage({
                    id: 'arduino.dataTypeMenu.string',
                    default: 'string',
                    description: 'label for string'
                }),
                value: DataType.String
            }
        ];
    }

    /**
     * Construct a set of Arduino blocks.
     * @param {Runtime} runtime - the Scratch Arduino runtime.
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor(runtime, originalDeviceId) {
        /**
         * The Scratch Arduino runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new Arduino nano peripheral instance
        this._peripheral = new Arduino(this.runtime, ArduinoNokia5110Device.DEVICE_ID, originalDeviceId);
    }

    /**
     * @returns {Array.<object>} metadata for this extension and its blocks.
     */
    getInfo() {
        return [
            {
                id: 'nokia5110',
                name: formatMessage({
                    id: 'arduino.category.nokia5110',
                    default: 'Nokia5110',
                    description: 'The name of the arduino device nokia 5110 category'
                }),
                color1: '#009297',
                color2: '#004B4C',
                color3: '#004B4C',
                blocks: [
                    {
                        opcode: 'setInitial',
                        text: formatMessage({
                            id: 'arduino.nokia5110.setInitial',
                            default: 'initial nokia 5110 lcd',
                            description: 'Initial Nokia 5110'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                        }
                    },
                    {
                        opcode: 'setDisplay',
                        text: formatMessage({
                            id: 'arduino.nokia5110.setDisplay',
                            default: 'disaply',
                            description: 'Display Nokia 5110'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                        }
                    },
                    {
                        opcode: 'clearDisplay',
                        text: formatMessage({
                            id: 'arduino.nokia5110.clearDisplay',
                            default: 'clear disaply',
                            description: 'Clear display Nokia 5110'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                        }
                    },
                    {
                        opcode: 'setContrast',
                        text: formatMessage({
                            id: 'arduino.nokia5110.setContrast',
                            default: 'set contrast [LEVEL]',
                            description: 'arduino set nokia 5110 contrast'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            LEVEL: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '40'
                            }
                        }
                    },
                    {
                        opcode: 'setCursor',
                        text: formatMessage({
                            id: 'arduino.nokia5110.setCursor',
                            default: 'set cursor x:[X] y:[Y]',
                            description: 'arduino set nokia 5110 cursor'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            X: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '0'
                            },
                            Y: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'writeText',
                        text: formatMessage({
                            id: 'arduino.nokia5110.writeText',
                            default: 'write text [TEXT]',
                            description: 'arduino nokia 5110 write text'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hi'
                            }
                        }
                    },
                    {
                        opcode: 'drawPixel',
                        text: formatMessage({
                            id: 'arduino.nokia5110.drawPixel',
                            default: 'draw pixel x:[X] y:[Y] color:[COLOR]',
                            description: 'arduino nokia 5110 draw pixel'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            X: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '10'
                            },
                            Y: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '10'
                            },
                            COLOR: {
                                type: ArgumentType.STRING,
                                menu: 'color',
                                defaultValue: 'BLACK'
                            }
                        }
                    },
                    {
                        opcode: 'drawPicture',
                        text: formatMessage({
                            id: 'arduino.nokia5110.drawPicture',
                            default: 'draw picture x:[X] y:[Y] picture:[PICTURE] color:[COLOR]',
                            description: 'arduino nokia 5110 draw picture'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            X: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '10'
                            },
                            Y: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '10'
                            },
                            PICTURE: {
                                type: ArgumentType.STRING,
                                menu: 'picture',
                                defaultValue: 'smileyFace'
                            },
                            COLOR: {
                                type: ArgumentType.STRING,
                                menu: 'color',
                                defaultValue: 'BLACK'
                            }
                        }
                    }
                ],
                menus: {
                    color: {
                        items: this.COLOR_MENU
                    },
                    picture: {
                        items: this.PICTURES_MENU
                    }
                }
            },
            {
                id: 'serial',
                name: formatMessage({
                    id: 'arduino.category.serial',
                    default: 'Serial',
                    description: 'The name of the arduino device serial category'
                }),
                color1: '#9966FF',
                color2: '#774DCB',
                color3: '#774DCB',
                blocks: [
                    {
                        opcode: 'serialBegin',
                        text: formatMessage({
                            id: 'arduino.serial.serialBegin',
                            default: 'serial begin baudrate [VALUE]',
                            description: 'arduino serial begin'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VALUE: {
                                type: ArgumentType.STRING,
                                menu: 'baudrate',
                                defaultValue: Buadrate.B9600
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'serialPrint',
                        text: formatMessage({
                            id: 'arduino.serial.serialPrint',
                            default: 'serial print [VALUE] [EOL]',
                            description: 'arduino serial print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello Scratch Arduino'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'serialAvailable',
                        text: formatMessage({
                            id: 'arduino.serial.serialAvailable',
                            default: 'serial available data length',
                            description: 'arduino serial available data length'
                        }),
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'serialReadData',
                        text: formatMessage({
                            id: 'arduino.serial.serialReadData',
                            default: 'serial read data',
                            description: 'arduino serial read data'
                        }),
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    baudrate: {
                        items: this.BAUDTATE_MENU
                    },
                    eol: {
                        items: this.EOL_MENU
                    }
                }
            },
            {
                id: 'data',
                name: formatMessage({
                    id: 'arduino.category.data',
                    default: 'Data',
                    description: 'The name of the arduino device data category'
                }),
                color1: '#CF63CF',
                color2: '#C94FC9',
                color3: '#BD42BD',
                blocks: [
                    {
                        opcode: 'dataMap',
                        text: formatMessage({
                            id: 'arduino.data.dataMap',
                            default: 'map [DATA] from ([ARG0], [ARG1]) to ([ARG2], [ARG3])',
                            description: 'arduino data map'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '100'
                            },
                            ARG2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1000'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    '---',
                    {
                        opcode: 'dataConstrain',
                        text: formatMessage({
                            id: 'arduino.data.dataConstrain',
                            default: 'constrain [DATA] between ([ARG0], [ARG1])',
                            description: 'arduino data constrain'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '100'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'dataConvert',
                        text: formatMessage({
                            id: 'arduino.data.dataConvert',
                            default: 'convert [DATA] to [TYPE]',
                            description: 'arduino data convert'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: '123'
                            },
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'dataType',
                                defaultValue: DataType.Integer
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'dataConvertASCIICharacter',
                        text: formatMessage({
                            id: 'arduino.data.dataConvertASCIICharacter',
                            default: 'convert [DATA] to ASCII character',
                            description: 'arduino data convert to ASCII character'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '97'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'dataConvertASCIINumber',
                        text: formatMessage({
                            id: 'arduino.data.dataConvertASCIINumber',
                            default: 'convert [DATA] to ASCII nubmer',
                            description: 'arduino data convert to ASCII nubmer'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: 'a'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    dataType: {
                        items: this.DATA_TYPE_MENU
                    }
                }
            }
        ];
    }

    /**
     * Set pin mode.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin mode is done.
     */
    setPinMode(args) {
        this._peripheral.setPinMode(args.PIN, args.MODE);
        return Promise.resolve();
    }

    /**
     * Set pin digital out level.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin digital out level is done.
     */
    setDigitalOutput(args) {
        this._peripheral.setDigitalOutput(args.PIN, args.LEVEL);
        return Promise.resolve();
    }

    /**
     * Set pin pwm out value.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin pwm out value is done.
     */
    setPwmOutput(args) {
        this._peripheral.setPwmOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }

    /**
     * Read pin digital level.
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if read high level, false if read low level.
     */
    readDigitalPin(args) {
        return this._peripheral.readDigitalPin(args.PIN);
    }

    /**
     * Read analog pin.
     * @param {object} args - the block's arguments.
     * @return {number} - analog value fo the pin.
     */
    readAnalogPin(args) {
        return this._peripheral.readAnalogPin(args.PIN);
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set servo out value is done.
     */
    setServoOutput(args) {
        this._peripheral.setServoOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }
}

module.exports = ArduinoNokia5110Device;