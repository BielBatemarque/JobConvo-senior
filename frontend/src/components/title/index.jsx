import { StyledH1 } from "./styles";

export const Title = ({ children, color, mt }) => {
    return(
        <StyledH1 color={color} mt={mt}>{children}</StyledH1>
    );
};