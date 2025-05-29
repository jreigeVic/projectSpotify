// Objective: Define the modal text component
type textProps = {
  title: string;
  body: string;
  className?: string;
};

export default function Text(props: textProps) {
  const {
    title = "Bem-vindo ao VHS",
    body = "Compartilhe sua playlist com a gente!",
    className = "",
  } = props;
  return (
    <section className={className}>
      <h1 className="m-2 w-auto">{title}</h1>
      <p className="my-2 w-auto">{body}</p>
    </section>
  );
}
