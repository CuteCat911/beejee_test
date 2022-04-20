import './notification.scss'

export const Notification = ({ data }) => {
    return <div className={`notification notification--${data.type}`}>
        { data.text }
    </div>
}
