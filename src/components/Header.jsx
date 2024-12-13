import { format } from "date-fns";
import foodImg from "../assets/images/Food Bar.png";
import { Link } from "react-router-dom";

const Header = () => {
  const date = new Date();

  return (
    <header className="my-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Link to={"/"}>
            <h1 className="text-5xl font-medium text-black">Savor.</h1>
          </Link>
          <p className="text-xl font-semibold tracking-wide select-none opacity-70">
            {format(date, "eee, dd MMM yyyy")}
          </p>
        </div>
        <div className="select-none">
          <img src={foodImg} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
