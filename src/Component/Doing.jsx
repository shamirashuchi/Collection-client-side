import React from 'react';
import useMenu from '../hooks/useMenu';
import Incompletedata from './Incompletedata';
const Doing = () => {
    const [menu] = useMenu();
    const doing = menu.filter(item => item.status === 'Doing');
    if (doing.length === 0) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className='grid grid-cols-1 gap-10 bg-base-300 h-screen overflow-y-scroll'>
            <div className='flex justify-between'>
                <h1 className='my-5 ms-10 font-semibold'>{doing[0].status}</h1>
                <p className='my-5 mr-10'>0</p>
            </div>
            {
                doing.map(item =>
                    <Incompletedata
                        key={item._id}
                        item={item}
                    ></Incompletedata>
                )
            }
        </div>
    );
};

export default Doing;