import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";

import { useNavigate } from "react-router";
import { ChatInterfaces } from "../utils/interfaces";

export default function Header(props: { selectedUser: ChatInterfaces.User | null }) {
  let navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    return navigate("/");
  };

  return (
    <div className="header">
      &nbsp;{props.selectedUser?.email}
      <Tooltip title="logout">
        <LogoutIcon className="logout-icon" onClick={handleLogout} />
      </Tooltip>
    </div>
  );
}
