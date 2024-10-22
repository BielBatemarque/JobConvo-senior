import { useNavigate } from "react-router-dom";
import { StyledLink } from "./styles";

export const NavItem = ({ text, redirecionamento }) => {
    const navigate = useNavigate();

    return (
        <StyledLink onClick={() => navigate(redirecionamento || "#")}>{text}</StyledLink>
    );
}