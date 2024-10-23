import { useNavigate } from "react-router-dom";
import { StyledLink } from "./styles";

export const NavItem = ({ text, redirecionamento, onClick }) => {
    const navigate = useNavigate();

    return (
        <StyledLink onClick={onClick || (() => navigate(redirecionamento || "#"))}>
            {text}
        </StyledLink>
    );
}