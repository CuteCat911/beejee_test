const createError = require('http-errors')
const toDoItemModel = require('../models/to-do-item.model')
const ERRORS_MESSAGES = require('../constants/errors-messages')
const ADMIN_CREDENTIALS = require('../constants/admin-credentials')

module.exports = (expressApp) => {
    expressApp.get('/api/tasks', async (req, res) => {
        const { page = 1, sorting } = req.query
        const totalTasksAmount = await toDoItemModel.getAllAmount()
        const tasks = await toDoItemModel.getByPage(page, sorting)

        return res.send({
            tasks: tasks,
            totalAmount: totalTasksAmount,
            isAuth: req.session.userId === ADMIN_CREDENTIALS.login
        })
    })

    expressApp.post('/api/task', async (req, res, next) => {
        const { name, email, taskText } = req.body

        if (!name || !email || !taskText) {
            return next(createError(400, ERRORS_MESSAGES[400]))
        }

        if (!/.+@.+\..{2,}/g.test(email)) {
            return next(createError(400, ERRORS_MESSAGES[400]))
        }

        const isCreated = await toDoItemModel.create({ name, email, taskText })

        return res.send(isCreated)
    })

    expressApp.patch('/api/task', async (req, res, next) => {
        const { id, text, isDone } = req.body

        if (req.session.userId !== ADMIN_CREDENTIALS.login) {
            return res.send({ needAuth: true })
        }

        if (!id) {
            return next(createError(400, ERRORS_MESSAGES[400]))
        }

        const isUpdated = await toDoItemModel.update({ id, text, isDone })

        return res.send({ success: isUpdated })
    })
}
