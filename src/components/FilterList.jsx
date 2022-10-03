import React from 'react'

const FilterList = ({ suggestedList, setSearchInput }) => {

    const handleClick = id => setSearchInput(id)
    return (
        <ul className='filter__list'>
            {
                suggestedList?.map(location => (
                    <li className='list__names' onClick={() => handleClick(location.id)} key={location.id}>{location.name}</li>
                ))
            }
        </ul >
    )
}

export default FilterList