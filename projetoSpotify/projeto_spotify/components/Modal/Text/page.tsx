
type textProps = {
    title: string;
    body: string
}

export default function Text(props: textProps) {

    return (
        <section>
            <img src="logo_vhs_preto.png" className='m-1 w-20' />
            <h1 className='m-2 w-auto'>{props.title}</h1>
            <p className='my-2 w-auto'>{props.body}</p>
        </section>
    );
}
