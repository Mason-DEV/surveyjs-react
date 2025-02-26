import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import { SubmissionService } from "../services/SubmissionService";
import JSONModal from "./JSONModal";

const FormRow = ({ form, id, onDelete }) => {
  const navigate = useNavigate();
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    const fetchSubmissionCount = async () => {
      try {
        const response = await SubmissionService.getSubmissionCount(id);
        setSubmissionCount(response.submissionCount);
      } catch (error) {
        console.error("Error fetching submission count:", error);
      }
    };

    fetchSubmissionCount();
  }, [id]);

  const handleEdit = (id) => {
    navigate(`/builder/${id}`);
  };

  const handleResults = (id) => {
    navigate(`/submission/${id}`);
  };

  const handleRun = async (id) => {
    try {
      const response = await SubmissionService.createSubmission(id);
      navigate(`/form/${response.submissionId}`);
    } catch (error) {
      console.error("Error creating submission:", error);
    }
  };

  return (
    <>
      <tr key={id}>
        <th scope="row">{form.title}</th>
        <td>
          <Button outline onClick={() => handleEdit(id)}>
            Edit Form
          </Button>
        </td>
        <td>
          <Button outline onClick={() => handleRun(id)}>
            Run Form
          </Button>
        </td>
        <td>
          <Button
            outline
            onClick={() => handleResults(id)}
            disabled={submissionCount === 0}
          >
            View Submissions{" "}
            <Badge color="dark" pill>
              {submissionCount}
            </Badge>
          </Button>
        </td>
        <td>
          <JSONModal data={form} />
        </td>
        <td>
          <Button
            color="danger"
            outline
            onClick={() => onDelete(id)}
            disabled={submissionCount > 0}
          >
            Delete Form
          </Button>
        </td>
      </tr>
    </>
  );
};

export default FormRow;
