import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>Keystracker project powered by React</header>
      <nav>
        <ul>
          <li>
            <Link to={`projects`}>Projects</Link>
          </li>
          <li>
            <Link to={`unknown`}>Unknown page</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <footer>All rights reserved</footer>
    </>
  );
}
