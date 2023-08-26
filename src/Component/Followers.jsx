import React from 'react';

const Followers = ({item}) => {
    const {name,picture} = item;
    return (
        <div>
            <img className='h-7 w-7 rounded-full mr-1' src={picture} alt="" />
        </div>
    );
};

export default Followers;