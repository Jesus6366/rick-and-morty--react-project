import React from 'react'

const LocationInfo = ({ location }) => {

    return (
        <article className='info__box'>
            <h2 className='info__title'>{location?.name}</h2>
            <ul className='info__list'>
                <li><span>Type: </span>{location?.type}</li>
                <li><span>Dimension: </span>{location?.dimension}</li>
                <li><span>Population: </span>{location?.residents.length}</li>
            </ul>
        </article>
    )
}

export default LocationInfo