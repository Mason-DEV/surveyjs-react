import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { SubmissionService } from "../services/SubmissionService";
import SubmissionTable from "../Components/SubmissionTable";

const Submission = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionData, setSubmissionData] = useState([]);

  const handleDelete = async (id) => {
    try {
      await SubmissionService.deleteSubmission(id);
      await fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const submissionData = await SubmissionService.getSubmissions(id);
      setSubmissionData(submissionData);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Alert color="danger">Error: {error}</Alert>;

  return (
    <SubmissionTable submission={submissionData} handleDelete={handleDelete} />
  );
};

export default Submission;
