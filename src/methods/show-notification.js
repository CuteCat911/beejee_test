export default (payload) => {
    const { notification, type, text, setNotification } = payload

    if (notification) {
        return
    }

    setNotification({ type, text })

    setTimeout(() => {
        setNotification(null)
    }, 5000)
}
