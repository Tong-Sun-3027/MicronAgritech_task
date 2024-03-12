// blacklist.js

const jwtBlacklist = new Set();  // every token is unique

// add token in the blacklist
function addToBlacklist(token) {
    jwtBlacklist.add(token);
}

// check the token is in token
function isInBlacklist(token) {
    return jwtBlacklist.has(token);
}

module.exports = {
    addToBlacklist:addToBlacklist,
    isInBlacklist:isInBlacklist,
    jwtBlacklist: jwtBlacklist
};
