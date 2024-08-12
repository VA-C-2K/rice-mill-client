/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm , question}) => {
    const isDelete = question.includes("delete");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {question}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme={isDelete ? "red" : "green"} mr={3} onClick={onConfirm}>
            {isDelete ? "Delete" : "Confirm"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
