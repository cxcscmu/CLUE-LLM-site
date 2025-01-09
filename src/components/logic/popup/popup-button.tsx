import React, { FC, useState, ReactNode } from "react";
import { CircleEllipsis } from "lucide-react"; 

import { Modal } from "@logic";
import { FunctionButton } from "@ui";

export const PopUpButton: FC<{
  openLabel?: string | ReactNode;
  disabled?: boolean;
  children: ReactNode;
}> = ({ openLabel, disabled=false, children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => { setModalOpen(!modalOpen) };

  if (openLabel === undefined) {
    openLabel = <CircleEllipsis />
  }

  return ( 
    <div>
      <FunctionButton
        onClick={toggleModal}
        disabled={disabled}
      >
        { openLabel }
      </FunctionButton>
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        { children }
      </Modal>
    </div>
  )
}