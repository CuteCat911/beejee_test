const ADMIN_CREDENTIALS = require('../constants/admin-credentials')
let session

module.exports = (expressApp) => {
    expressApp.post('/api/login', (req, res) => {
        const { login, password } = req.body
        const isCorrectCredentials = login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password

        if (!isCorrectCredentials) {
            return res.send(false)
        }

        session = req.session
        session.userId = ADMIN_CREDENTIALS.login

        return res.send(true)
    })

    expressApp.post('/api/logout', (req, res) => {
        session.destroy()
        return res.send(true)
    })
}
