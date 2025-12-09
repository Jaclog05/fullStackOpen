function Person({name, number, onDelete}) {
  return (
    <div>
      <span>{name} {number}</span>
      <button onClick={onDelete}>delete</button>
    </div>
  )
}

export default Person