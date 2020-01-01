import react from 'react'

const Notification = ({message}) => {
    return(
        <div className="error">
            {message}
        </div>
    )
}

export default Notification