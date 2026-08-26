import "./Modal.css";

function Modal({ closeModal, title, children }) {
    return (
        <div
            className="modalBackground"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeModal(false);
                }
            }}
        >
            <div className="modalContainer">
                <button
                    className="closeButton"
                    onClick={() => closeModal(false)}
                >
                    ×
                </button>

                {title && (
                    <div className="title">
                        <h2>{title}</h2>
                    </div>
                )}

                <div className="body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;