import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, Badge, Button } from "reactstrap";

const SubmissionTable = ({ submission, handleDelete }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/form/${id}`);
  };

  return (
    <Table responsive borderless>
      <thead className="table-primary">
        <tr>
          <th scope="col">Submission ID</th>
          <th scope="col">Status</th>
          <th scope="col">View</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(submission).map(
          (key) => (
            console.log(submission[key]),
            (
              <tr key={key}>
                <td>{submission[key]._id}</td>
                <td>
                  {submission[key].isCompleted ? (
                    <Badge color="success" pill>
                      Submitted
                    </Badge>
                  ) : (
                    <Badge color="info" pill>
                      In progress
                    </Badge>
                  )}
                </td>
                <td>
                  <Button
                    color="primary"
                    outline
                    onClick={() => handleView(submission[key]._id)}
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    color="danger"
                    outline
                    onClick={() => handleDelete(submission[key]._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          )
        )}
      </tbody>
    </Table>
  );
};

export default SubmissionTable;
