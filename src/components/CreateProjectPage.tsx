import { FormEventHandler, useRef, useState } from "react";
import styles from "./styles/CreateProjectPage.module.css";
import ProjectService from "../services/ProjectService";

export default function CreateProjectPage() {
  const [projectId, setProjectId] = useState<number>(0);

  const inputProjectNameRef = useRef<HTMLInputElement>(null);
  const inputProjectURLRef = useRef<HTMLInputElement>(null);

  const cliParametersFormEnabled = {
    display: projectId === 0 ? "none" : "inherit",
  };

  const onSubmitCreateProjectForm: FormEventHandler = (event) => {
    event.preventDefault();
    const project = {
      name:
        (inputProjectNameRef.current && inputProjectNameRef.current.value) ||
        "",
      url: inputProjectURLRef.current.value,
    };
  };

  return (
    <article className={styles.createProjectPage}>
      <h1>Add a new project</h1>

      <h2>Step 1</h2>
      <form onSubmit={onSubmitCreateProjectForm}>
        <label htmlFor="projectName">Name</label>
        <input ref={inputProjectNameRef} type="text" id="projectName" />

        <label htmlFor="url">URL</label>
        <input ref={inputProjectURLRef} type="url" id="url" />

        <input type="submit" value="Continue" />
      </form>

      <section style={cliParametersFormEnabled}>
        <h2>Step 2</h2>
        <form>
          <label htmlFor="firstOctaveAt">First octave at</label>
          <input type="number" id="firstOctaveAt" />

          <label htmlFor="octavesLength">Octaves length</label>
          <input type="number" id="octavesLength" />

          <label htmlFor="numberOfOctaves">Number of octaves</label>
          <input type="number" id="numberOfOctaves" />

          <label htmlFor="rawFrameLinesExtract">
            Lines to extract from raw frame
          </label>
          <input type="number" id="rawFrameLinesExtract" />

          <label htmlFor="rawFrameCopyFrom">
            Start copy from raw frame line{" "}
          </label>
          <input type="number" id="rawFrameCopyFrom" />

          <label htmlFor="trackmode">Track mode</label>
          <select id="trackmode">
            <option value="FallingNotes">Falling notes</option>
            <option value="Keys">Keys</option>
          </select>

          <label htmlFor="rawFrameSkip">Skip these many frames</label>
          <input type="number" id="rawFrameSkip" defaultValue={10} />

          <label htmlFor="rawFramesDivisiblyBy">
            Process frames divisible by
          </label>
          <input type="number" id="rawFramesDivisiblyBy" defaultValue={1} />

          <label htmlFor="leftHandWhiteKeyColor">
            Left hand white key color
          </label>
          <input type="color" id="leftHandWhiteKeyColor" />

          <label htmlFor="leftHandBlackKeyColor">
            Left hand black key color
          </label>
          <input type="color" id="leftHandBlackKeyColor" />

          <label htmlFor="rightHandWhiteKeyColor">
            Right hand white key color
          </label>
          <input type="color" id="rightHandWhiteKeyColor" />

          <label htmlFor="rightHandBlackKeyColor">
            Right hand black key color
          </label>
          <input type="color" id="rightHandBlackKeyColor" />

          <input type="submit" value="Process" />
        </form>
      </section>
    </article>
  );
}
