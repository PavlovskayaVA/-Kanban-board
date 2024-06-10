import { Link, useRouteError } from "react-router-dom";

function ErrorPage404() {
  const error = useRouteError();

  return (
    <div className="page-error">
      <h1>Hi! It is an Error Page</h1>
      <h2>404 Not Found Error</h2>
      <p>
        <i>{error.statusText}</i>
      </p>
      <p>
        <i>{error.data}</i>
      </p>
      <Link to={`/`}>
        <button>Main Page</button>
      </Link>
    </div>
  );
}

export default ErrorPage404;