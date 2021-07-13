import FeedbackLogic from "./Feedback.logic";
import {
    StyledCloseButton,
    StyledFeedbackButton,
    StyledFeedbackModal,
} from "./Feedback.styles";

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
        error,
        feedbackContent,
    } = FeedbackLogic();
    useOnOpenChange(open);

    if (error) return <p>Content collection error...</p>;

    return (
        <>
            <StyledFeedbackButton
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                }}
            >
                {feedbackContent.openMessage}
                <button>!</button>
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
                        <h3>{feedbackContent.title}</h3>
                        <p>{feedbackContent.explanation}</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleFeedback(id, type);
                            }}
                        >
                            <label>
                                {feedbackContent.textboxLabel}
                                <textarea
                                    name="why"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </label>
                            <button>{feedbackContent.sendButton}</button>
                        </form>
                    </div>
                </StyledFeedbackModal>
            )}
        </>
    );
};

export default Feedback;
