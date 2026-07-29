function Modal({ closeModal, title, children }) {
    return (
        <div className="modalBackground">
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