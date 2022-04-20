import axios from 'axios'

export default async (payload) => {
    let response

    try {
        response = await axios.patch('/api/task', payload)
    } catch (error) {
        console.error(error)
        throw error
    }

    return response.data
}
