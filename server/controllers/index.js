const ClientController = require('./client.controller')
const ToDoItemController = require('./to-do-item.controller')
const AdminController = require('./admin.controller')

module.exports = (expressApp) => {
    ClientController(expressApp)
    ToDoItemController(expressApp)
    AdminController(expressApp)
}
