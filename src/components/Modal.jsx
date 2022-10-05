import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ showModal, setShowModal, children }) {
  const modalRef = useRef(null);

  const handleCloseOnClick = (e) => {
    const clickPosition = e.target.getBoundingClientRect();
    clickPosition.x === 0 && setShowModal(false);
  };

  useEffect(() => {
    const listener = document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    });

    return () => document.removeEventListener("keyup", listener);
  }, []);

  if (showModal) {
    return ReactDOM.createPortal(
      <div className="modal" onMouseDown={(e) => handleCloseOnClick(e)}>
        <div className="testWrapper" ref={modalRef}>
          {children}
        </div>
      </div>,

      document.querySelector("#modal")
    );
  }
}

export default Modal;
