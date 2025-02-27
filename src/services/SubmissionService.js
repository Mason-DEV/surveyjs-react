import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_PATH = `${API_URL}/submissions`;

/**
 * Service for handling form submissions
 * @namespace SubmissionService
 */
const SubmissionService = {
  /**
   * Get all submissions for a form
   * @param {string} formID - The ID of the form
   * @returns {Promise<object>} The submissions data
   */
  getSubmissions: async (formID) => {
    const { data } = await axios.get(`${BASE_PATH}/getbyformID/${formID}`);
    return data;
  },

  /**
   * Get a specific submission
   * @param {string} submissionID - The ID of the submission
   * @returns {Promise<object>} The submission data
   */
  getSubmission: async (submissionID) => {
    const { data } = await axios.get(
      `${BASE_PATH}/getbysubmissionID/${submissionID}`
    );
    return data;
  },

  /**
   * Update an existing submission
   * @param {string} submissionID - The ID of the submission
   * @param {object} json - The updated submission data
   * @returns {Promise<object>} The updated submission
   */
  updateSubmission: async (submissionID, json) => {
    const { data } = await axios.post(
      `${BASE_PATH}/update/${submissionID}`,
      json
    );
    return data;
  },

  /**
   * Get the count of submissions for a form
   * @param {string} formID - The ID of the form
   * @returns {Promise<number>} The submission count
   */
  getSubmissionCount: async (formID) => {
    const { data } = await axios.get(`${BASE_PATH}/count/${formID}`);
    return data;
  },

  /**
   * Create a new submission for a form
   * @param {string} formID - The ID of the form
   * @returns {Promise<object>} The created submission
   */
  createSubmission: async (formID) => {
    const { data } = await axios.post(`${BASE_PATH}/create/${formID}`);
    return data;
  },

  /**
   * Delete a submission
   * @param {string} submissionID - The ID of the submission to delete
   * @returns {Promise<object>} The deletion result
   */
  deleteSubmission: async (submissionID) => {
    const { data } = await axios.delete(`${BASE_PATH}/${submissionID}`);
    return data;
  },
};

export { SubmissionService };
