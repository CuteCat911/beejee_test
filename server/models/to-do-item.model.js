const dbService = require('../db.service')

module.exports = {
    async create (payload) {
        const { name, email, taskText } = payload
        const queryParams = [name, email, taskText]
        const result = await dbService.query('INSERT INTO to_do_item (user_name, email, text) VALUES (?, ?, ?)', queryParams)

        return Boolean(result)
    },
    async update (payload) {
        const { id, text, isDone } = payload
        const queryParams = text ? [isDone, text, true] : [isDone]
        const query = `UPDATE to_do_item SET is_done = ?${text ? `, text = ?, is_edited = ?` : ''} WHERE id = ${id}`
        const result = await dbService.query(query, queryParams)

        return Boolean(result)
    },
    async getAllAmount () {
        const result = await dbService.query('SELECT COUNT(*) AS amount FROM to_do_item')
        return result[0].amount
    },
    async getByPage (page, sorting) {
        const tasksOnPage = 3
        const offset = (page - 1) * 3
        let sortingQuery

        switch (sorting) {
            case 'name:asc':
                sortingQuery = 'ORDER BY user_name ASC'
                break
            case 'name:desc':
                sortingQuery = 'ORDER BY user_name DESC'
                break
            case 'email:asc':
                sortingQuery = 'ORDER BY email ASC'
                break
            case 'email:desc':
                sortingQuery = 'ORDER BY email DESC'
                break
            case 'status:asc':
                sortingQuery = 'ORDER BY is_done ASC'
                break
            case 'status:desc':
                sortingQuery = 'ORDER BY is_done DESC'
                break
            default:
                sortingQuery = 'ORDER BY id DESC'
                break
        }

        const query = `SELECT * FROM to_do_item AS tasks ${sortingQuery} LIMIT ${tasksOnPage} OFFSET ${offset}`

        return await dbService.query(query)
    }
}
