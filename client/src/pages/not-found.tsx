import { paths } from "@/config/paths";
import { Link } from "react-router-dom";

export const NotFoundRoute = () => {
  return (
    <div className="flex flex-col items-center font-semibold mt-52">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to={paths.home.getHref()} replace>
        Go to Home
      </Link>
    </div>
  );
};
