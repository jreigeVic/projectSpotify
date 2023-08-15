export default function Button(props) {

    return (
        <section>
            <form>
                <div>
                    <input required={props.required} className='mr-2' type='checkbox' placeholder='termos de uso *' />
                    <label>{props.userTerms}</label>
                </div>
                <button className='mt-6 w-max rounded-md flex flex-row bg-green-600 hover:bg-green-500 '>
                    <img src={props.buttonImg} className='w-10 my-2 mx-4 ' /> <p className='m-auto'>{props.buttonText}</p>
                </button>
            </form>
        </section>
    );
}