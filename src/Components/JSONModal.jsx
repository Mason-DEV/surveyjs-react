import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

const JSONModal = ({ data }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button outline color="dark" onClick={toggle}>
        View JSON
      </Button>
      <Modal scrollable size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Mongo document ID{data._id}</ModalHeader>
        <ModalBody>
          <JsonView
            src={data}
            displaySize={true}
            displayArrayIndex={true}
            enableClipboard={false}
            theme="atom"
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default JSONModal;
