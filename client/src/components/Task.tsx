interface Props {
  text: string;
  details: string;
}

export default function Task(props: Props) {
  let localText = props.text;
  if (props.text == "Hello") {
    localText = "Hello even more";
  }
  return (
    <div className="flex flex-row">
      <div className="flex flex-col bg-red-600">
        <p>{localText}</p>
        <p>{props.details}</p>
      </div>
    </div>
  );
}