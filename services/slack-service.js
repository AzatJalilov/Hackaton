const querystring = require('query-string');

function parseSlackRequest(ctx) {
    const request = ctx.request.url;
    const requstParams = querystring.parse(request);
    const command = requstParams.command;
    const text = requstParams.text;
    if (!text) {
        throw 'Invalid arguments';
    }
    const variables = text.split(' ');
    let payload = {};
    variables.forEach(variable => {
        const arg = variable.split(':');
        if (arg.length !== 2) {
            throw 'Invalid arguments';
        }
        payload[arg[0]] = arg[1];
    });
    return { command, payload };
}

function formatResponse(message) {

}

module.exports = { parseSlackRequest, formatResponse }