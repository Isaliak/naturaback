
const getIp = (req) => {
    let ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
    return ip
}

module.exports = { getIp }