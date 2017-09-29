const c = require('colors');
const util = require('util');
const objUtils = require('../utils/object.util');
const SENT_KEY = 'sent';

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
            return c.blue(`[${current - Number(sent)}]`);
        }
    })
};

module.exports.log = ":method :url :status :sent :body"