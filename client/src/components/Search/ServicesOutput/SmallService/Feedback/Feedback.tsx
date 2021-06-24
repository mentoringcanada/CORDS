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
                Does this service not work here?
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
                        handleFeedback(id, type);
                        setOpen(false);
                    }}
                >
                    <div
                        className="container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <StyledCloseButton
                            className="close-button"
                            onClick={() => {
                                handleFeedback(id, type);
                                setOpen(false);
                            }}
                        >
                            <span>&#x1F5D9;</span>
                        </StyledCloseButton>
                        <h3>Please tell us why</h3>
                        <p>
                            This information helps us provide better results in
                            the future.
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleFeedback(id, type);
                            }}
                        >
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
