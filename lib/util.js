function SQL(parts, ...values) {
    return {
        text: parts.reduce((prev, curr, i) => prev + '$' + i + curr),
        values
    };
}

module.exports = {
    SQL
}
