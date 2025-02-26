import React from "react";
import { Table } from "reactstrap";
import FormRow from "./FormRow";

const FormsTable = ({ forms, onDelete }) => (
  <Table responsive borderless>
    <tbody>
      {Object.keys(forms).map((key) => (
        <FormRow
          key={key}
          form={forms[key]}
          id={forms[key]._id}
          onDelete={onDelete}
        />
      ))}
    </tbody>
  </Table>
);

export default FormsTable;
