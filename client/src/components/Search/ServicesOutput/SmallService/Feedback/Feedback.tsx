import { StyledCloseButton } from "../../../../Widget/Header/Header.styles";
import FeedbackLogic from "./Feedback.logic";
import { StyledFeedbackButton, StyledFeedbackModal } from "./Feedback.styles";

interface Props {
    id: string;
    type: string;
}

const Feedback = ({ id, type }: Props) => {
    const {
        open,
        setOpen,
        message,
        setMessage,
        handleFeedback,
        useOnOpenChange,
    } = FeedbackLogic();

    useOnOpenChange(open);

    return (
        <>
            <StyledFeedbackButton>
                Service not fit with search?
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                    }}
                >
                    !
                </button>
            </StyledFeedbackButton>
            {open && (
                <StyledFeedbackModal
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                    }}
                >
                    <div
                        className="container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <StyledCloseButton
                            className="close-button"
                            onClick={() => setOpen(false)}
                        >
                            <span>&#x1F5D9;</span>
                        </StyledCloseButton>
                        <h3>Does this service not fit with your search?</h3>
                        <p>
                            This information helps us provide better results in
                            the future.
                        </p>
                        <form onSubmit={(e) => handleFeedback(e, id, type)}>
                            <label>
                                WHY (optional)
                                <textarea
                                    name="why"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </label>
                            <button>Send</button>
                        </form>
                    </div>
                </StyledFeedbackModal>
            )}
        </>
    );
};

export default Feedback;
