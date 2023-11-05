export default function Task(props: Task) {
  let localText = props.title;
  if (props.title == "Hello") {
    localText = "Hello even more";
  }
  return (
    <div className="flex flex-row">
      <div className="flex flex-col bg-red-600">
        <p>{localText}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
}