
async function findAPlace() {
    return setTimeout(function () {
        return 'I am a recommendation';
    }, 2000);
}

module.exports = { findAPlace }