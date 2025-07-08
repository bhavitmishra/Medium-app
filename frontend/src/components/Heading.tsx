interface props {
  title: string;
}

export default function Heading({ title }: props) {
  return <div className="text-center font-bold text-3xl p-5">{title}</div>;
}
