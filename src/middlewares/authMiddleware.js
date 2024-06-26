const jwt = require('jsonwebtoken')
require('dotenv').config()
function verifyToken(req, res, next) {
    const token = req.header('Authorization')
    if(!token) return res.status(401).json({ error : 'Access denied' })
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || '004AZERTY' )
    }
    catch (e){
        res.status(401).json({error: 'Invalid token'})
        console.log('error: ' + e)
    }
}

module.exports = verifyToken