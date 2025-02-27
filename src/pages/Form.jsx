import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import { SubmissionService } from "../services/SubmissionService";
import FormsService from "../services/FormService";

const Form = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [surveyModel, setSurveyModel] = useState(null);

  const saveSurveyData = async (survey) => {
    const data = survey.data;
    data.isCompleted = survey.isCompleted;
    data.pageNo = survey.currentPageNo;
    await SubmissionService.updateSubmission(id, data);
  };

  const fetchData = async () => {
    try {
      const submissionData = await SubmissionService.getSubmission(id);
      const formData = await FormsService.getForm(
        submissionData.formDocumentID
      );

      const surveyModel = new Model(formData);
      if (submissionData) {
        surveyModel.data = submissionData;
        if (submissionData.isCompleted) {
          surveyModel.mode = "display";
        }
      }

      // Save on any question value change callback
      surveyModel.onValueChanged.add(saveSurveyData);
      // Save on page change callback
      surveyModel.onCurrentPageChanged.add(saveSurveyData);
      // Save on survey complete callback
      surveyModel.onComplete.add(saveSurveyData);

      setSurveyModel(surveyModel);
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
  if (!surveyModel) return <Alert color="warning">No form found</Alert>;

  return (
    <Container>
      <Survey model={surveyModel} />
    </Container>
  );
};

export default Form;
