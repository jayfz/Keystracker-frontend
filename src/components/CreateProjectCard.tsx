import { RoundedActionButton } from "./RoundedActionButton";

export function CreateProjectCard() {
  const thumbnail = "./no-thumbnail.jpg";

  const onClickHandler = () => {
    //route to create Project
    console.log("routing to create project");
  };

  return (
    <article onClick={onClickHandler}>
      <section>
        <img src={thumbnail} />
        <RoundedActionButton />
      </section>
      <section>
        <p>Add a new project...</p>
      </section>
    </article>
  );
}
