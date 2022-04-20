import axios from 'axios'

export default async (payload) => {
    const { page = 1, sorting } = payload
    let response

    try {
        response = await axios.get('/api/tasks', { params: { page, sorting } })
    } catch (error) {
        console.error(error)
        throw error
    }

    const { status, data } = response

    if (status !== 200) {
        return {
            tasks: [],
            totalAmount: 0
        }
    }

    return data
}
