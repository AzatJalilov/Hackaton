const rp = require('request-promise');
function parseSlackRequest(ctx) {
    const requstParams = ctx.request.body;
    console.log(requstParams);
    const command = requstParams.command;
    const responseUrl = requstParams.response_url;
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
function sendDelayedResponse(responseUrl, responseBody) {
    rp(responseUrl, {
        method: 'POST',
        body: responseBody,
        headers: { 'Content-type': 'application/json' },
        json: true,
    });
}
function createImmediateResponse(parsedRequest) {
    return {
        "response_type": 'emphereal',
        text: `Hello <@${parsedRequest.userId}>. We are working on finding a place for you!!`
    };
}

function formatResponse(restaurant, parsedRequest) {
    return {
        response_type: 'in_channel',
        text: `<@${parsedRequest.userId}>, we recommend you go to ${restaurant.name}!`,
        attachments: [
            {
                "author_name": restaurant.name,
                "author_link": restaurant.url,
                "fields": [
                    {
                        "title": "Rating",
                        "value": restaurant.rating,
                        "short": false
                    },
                    {
                        "title": "Website",
                        "value": restaurant.website,
                        "short": false
                    }
                ],
            }
        ]
    };
}

module.exports = { parseSlackRequest, formatResponse, createImmediateResponse, sendDelayedResponse }