let asciiChars = null

const getAsciiChars = () => {
    if (asciiChars && asciiChars.length >= 26 * 2 + 10) return asciiChars

    const chars = []

    for (let i = 0; i < 26; i++) {
        chars.push(String.fromCharCode(i + 97))
        chars.push(String.fromCharCode(i + 65))
    }

    for (let i = 0; i < 10; i++) {
        chars.push(i.toString())
    }

    asciiChars = [...chars]
    return chars
}

const randomStr = (len = 25) => {
    const allowedChars = getAsciiChars()

    return new Array(len)
        .fill(0).map(() => {
            const index = Math.round(Math.random() * allowedChars.length)
            return allowedChars[index]
        }).join('')
}

module.exports = {
    randomStr
}
