
async function findAPlace() {
    await timeout(2000);
    return 'I am a recommendation';
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { findAPlace }