//logger is responsible for printing information
//and errors to console

const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info,error
}