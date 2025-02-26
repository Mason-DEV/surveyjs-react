import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Container, Button } from "reactstrap";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { CREATOR_OPTIONS } from "../util/config";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import FormsService from "../services/FormService";
import "@styles/builder.css";
import "survey-core/survey.i18n.js";
import "survey-creator-core/survey-creator-core.i18n.js";

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [creatorData, setCreatorData] = useState(null);
  const [error, setError] = useState(null);

  const handleSaveAndClose = () => {
    //TODO implpelement save and close
    navigate("/ ");
  };

  useEffect(() => {
    const fetchFormBuilder = async () => {
      try {
        const data = await FormsService.getForm(id);
        const creator = new SurveyCreator(CREATOR_OPTIONS);
        creator.JSON = data;
        creator.isAutoSave = true;

        creator.saveSurveyFunc = async (saveNo, callback) => {
          try {
            await FormsService.updateForm(id, creator.JSON);
            callback(saveNo, true);
          } catch (error) {
            callback(saveNo, false);
            setError(error.message);
          }
        };

        setCreatorData(creator);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFormBuilder();
    }
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Alert color="danger">Error: {error}</Alert>;

  return (
    <Container fluid className="builder-container">
      <div className="survey-creator-wrapper">
        <SurveyCreatorComponent creator={creatorData} />
      </div>
      <div className="action-button-wrapper">
        <Button color="success" size="md" onClick={handleSaveAndClose}>
          Save and Close
        </Button>
      </div>
    </Container>
  );
};

export default Builder;
