import React from 'react'

function Modal() {
    return (
        <div className="mx-auto flex min-h-screen max-w-screen-sm items-center  justify-center ">
            <div className="rounded-md bg-gradient-to-r from-red-500 via-yellow-500 ye to-violet-500 p-1">
                <div className='flex flex-col h-full w-full p-10  bg-gray-300 dark:bg-gray-800 back'>
                    <img src="#" className='m-1' />
                    <h1 className='m-2'>Compartilhe sua playlist com a gente!</h1>
                    <p className='my-2'>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                    <div>
                        <input className='mr-2' type='checkbox' placeholder='termos de uso *' />
                        <label>termos de uso  *</label>
                    </div>
                    <button className='mt-6 rounded-md flex flex-row bg-green-600 hover:bg-green-500'>
                        <img src='#' /> <p className='mx-auto'>conecte-se</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;