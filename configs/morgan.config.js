const c = require('colors');
const util = require('util');
const objUtils = require('../utils/object.util');
const fs = require('fs');
const path = require('path');

const SENT_KEY = 'sent';
const LOG_DIR = 'logs';

fs.existsSync(LOG_DIR) || fs.mkdirSync(LOG_DIR);
var sentLogStream = fs.createWriteStream(path.join(`${__dirname}/../${LOG_DIR}/`, 'sent.log'), { flags: 'a' })

module.exports.setup = (morgan) => {
    morgan.token('body', (req) => {
        return c.grey(util.inspect(req.body, { showHidden: true, depth: null }));
    });
    morgan.token('status', (req, res) => {
        const status = res.statusCode;
        return status >= 500 ? c.red(status)
            : status >= 400 ? c.yellow(status)
            : status >= 300 ? c.cyan(status)
            : status >= 200 ? c.green(status)
            : c.grey(status);
    });
    morgan.token('sent', (req, res) => {
        const sent = objUtils.deepKeyFind(SENT_KEY, req.body);
        if (sent) {
            const current = Date.now().valueOf();
            return current - Number(sent);
        }
    })
};

module.exports.log = ":method :url :status :sent :body"
module.exports.streamLog = ":sent"
module.exports.stream = sentLogStream