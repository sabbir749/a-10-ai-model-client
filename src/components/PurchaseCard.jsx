import React from 'react';

const PurchaseCard = ({ model }) => {
    const { name, framework, useCase, createdBy, purchasedBy, image } = model
    console.log(model);

    return (
        <>
            <div className='border border-gray-300  flex p-3 shadow-sm bg-gray-200 rounded-sm gap-5'>
                <img src={image} className='w-50' alt="" />

                <div className='flex flex-col p-4 justify-between'>
                    <h2 className='font-bold text-blue-800'>
                        {name}
                    </h2>
                    <div className='flex space-x-4'>
                        <p>{framework}</p>
                        <p>  {useCase}</p>
                        <p>  {createdBy}</p>
                        <p> {purchasedBy}</p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default PurchaseCard;