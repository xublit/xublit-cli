export default class IoId {

    constructor () {
        initAttrs(this);
    }

    toString () {
        return this.value;
    }

}

function initAttrs (ioId, ioIdStr) {

    Object.defineProperties(ioId, {

        value: {
            value: createRandomIoId(),
        },

    });

}

function createRandomIoId () {
    return randomHexToBase64().replace(/[\+\/=]/g, '');
}

function randomHexToBase64 () {
    
    var randomHex = Math.random().toString().replace('.', '');
    
    if (1 === randomHex.length % 2) {
        randomHex = randomHex + '0';
    }
    
    randomHex = new Buffer(randomHex, 'hex');
    
    return randomHex.toString('base64');

}
