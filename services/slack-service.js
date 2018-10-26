
function parseSlackRequest(ctx) {
    const requstParams = ctx.request.body;
    console.log(requstParams);
    const command = requstParams.command;
    const responseUrl = requstParams.responseUrl;
    const userId = requstParams.user_id;
    const text = requstParams.text;
    if (!text) {
        return 'No text argument';
    }
    const variables = text.split(' ');
    let payload = {};
    variables.forEach(variable => {
        const arg = variable.split(':');
        if (arg.length !== 2) {
            return 'Invalid arguments';
        }
        payload[arg[0]] = arg[1];
    });
    return { command, payload, responseUrl, userId };
}

function formatResponse(message) {

}

module.exports = { parseSlackRequest, formatResponse }