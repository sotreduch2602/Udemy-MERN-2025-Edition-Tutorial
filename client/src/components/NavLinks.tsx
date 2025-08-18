import { NavLink } from "react-router-dom";
import Link from "../utils/link";
import { useDashboardContext } from "../pages/DashboardLayout";

interface NavLinksProps {
  isBigSidebar: boolean;
}

const NavLinks = ({ isBigSidebar }: NavLinksProps) => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {Link.map((LinkItem) => {
        const { text, path, icon } = LinkItem;
        return (
          <NavLink
            to={path}
            key={text}
            className={"nav-link"}
            onClick={isBigSidebar ? undefined : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
