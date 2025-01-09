import { useEffect, useRef, FC, ReactNode, MouseEventHandler } from "react";
import { X } from "lucide-react";

import { FunctionButton } from "@ui";

export const Modal: FC<{
  isOpen: boolean;
  onClose: Function;
  children: ReactNode;
}> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (modalRef.current && !modalRef.current.contains(e.target as HTMLElement)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if ( isOpen ) {
    return (
      <div className="modal-overlay">
        <div className="modal" ref={modalRef}>
          <FunctionButton
            onClick={onClose as MouseEventHandler}
          >
            <X />
          </FunctionButton>
          {children}
        </div>
      </div>
    )
  }
};