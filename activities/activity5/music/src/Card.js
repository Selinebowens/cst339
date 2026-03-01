import React from 'react';

const Card = (props) => {
    return (
        <div className='card' style={{ width: '18rem' }}>
            <img src={props.imgURL} alt="title" />
            <div className='card-body'>
                <h5 className='card-title'>{ props.albumTitle }</h5>
                <p className='card-text'>
                    {props.albumDescription}
                </p>
                <button className='btn btn-primary'>
                    {props.buttonText}
                </button>
            </div>
        </div>
    )
}

export default Card;