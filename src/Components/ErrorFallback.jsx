import React from "react";
import errorFallbackIcon from "../assets/error-fallback.svg";
import { Container, Row, Col, Button } from "reactstrap";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Container
      fluid
      className="h-100 d-flex align-items-center justify-content-center"
    >
      <Row className="text-center">
        <Col xs={12} className="mb-4">
          <h2 className="mb-2">Oops! Something went wrong</h2>
          <img
            src={errorFallbackIcon}
            alt="Error occurred"
            style={{
              width: "50%",
              height: "auto",
              opacity: "0.8",
            }}
          />
        </Col>
        <Col xs={12} className="mb-1">
          <p className="text-danger">
            {error.message || "An unexpected error has occurred"}
          </p>
        </Col>
        <Col xs={12}>
          <Button
            color="primary"
            outline
            onClick={resetErrorBoundary}
            className="px-4 py-2"
            href="/"
          >
            Return Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorFallback;
