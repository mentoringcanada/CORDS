import StartLogic from "./Start.logic";
import { StyledPopUp } from "./Start.styles";

const StartScreen = () => {
    const { allowUse, password, handleAuth, handlePassword } = StartLogic();
    return (
        <>
            {!allowUse && (
                <StyledPopUp data-testid="pop-up">
                    <form onSubmit={handleAuth}>
                        Welcome to the CORDS Demo
                        <label>
                            PASSWORD
                            <input
                                type="password"
                                onChange={handlePassword}
                                value={password}
                                data-testid="password-input"
                            />
                        </label>
                        <input type="submit" />
                    </form>
                </StyledPopUp>
            )}
        </>
    );
};

export default StartScreen;
