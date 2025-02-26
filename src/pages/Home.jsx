import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Row, Col } from "reactstrap";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import FormsTable from "../components/FormsTable";
import FormsService from "../services/FormService";

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [forms, setForms] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const formsData = await FormsService.getForms();
      setForms(formsData);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await FormsService.createForm();
      await fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await FormsService.deleteForm(id);
      await fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Alert color="danger">Error: {error}</Alert>;

  const formCount = Object.keys(forms).length;

  return (
    <Container fluid className="home-container">
      <Row className="home-header">
        <Col>
          <h3>Submission Forms</h3>
        </Col>
      </Row>
      <Row className="home-middle-row">
        <Col>
          {formCount === 0 ? (
            <Alert color="info">No submissions found</Alert>
          ) : (
            <FormsTable forms={forms} onDelete={handleDelete} />
          )}
        </Col>
      </Row>
      <Row className="home-footer">
        <Col>
          <Button color="primary" onClick={handleCreate} outline>
            Create Submission Form
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
