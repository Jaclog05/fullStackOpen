const Notification = ({successMessage, errorMessage}) => {
  if(!successMessage && !errorMessage) {
    return null
  }

  const color = errorMessage ? 'red' : 'green'

  return (
    <div className="notification" style={{color}}>
      {errorMessage}
      {successMessage}
    </div>
  )
}

export default Notification