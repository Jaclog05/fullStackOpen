import React from 'react'

function SearchFilter({filterName, handleFilterChange}) {
  return (
    <>
      filter shown with
      <input
        value={filterName}
        onChange={handleFilterChange}
      />
    </>
  )
}

export default SearchFilter