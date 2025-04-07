import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";

import { useNavigate } from "react-router";

export default function Header() {
  let navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    return navigate("/");
  };

  return (
    <div className="header">
      &nbsp;Welcome to ChatApp IO
      <Tooltip title="logout">
        <LogoutIcon className="logout-icon" onClick={handleLogout} />
      </Tooltip>
    </div>
  );
}
