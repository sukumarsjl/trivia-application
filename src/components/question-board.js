import { Formik } from "formik";
import { useEffect } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appAction from "../stores/app-action";

export default (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const values = useSelector((state) => state.trivia);
  const questions = useSelector((state) => state.trivia.questions);

  useEffect(() => {
    if (typeof values !== "undefined") {
      dispatch(
        appAction.getQuestions({
          amount: values.no_of_questions,
          difficulty: values.difficulty,
          category: values.category,
        })
      );
    } else {
      navigate("/");
    }
  }, []);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    let scores = calculateScore(values);

    navigate("/result-board", {
      state: {
        questions: questions.length,
        score: {
          points: scores.points,
          percentage: scores.percentage,
        },
      },
    });
    setSubmitting(false);
  };

  const calculateScore = (values) => {
    let questionCount = questions.length;
    let correctAnswers = 0;
    let inCorrectAnswers = 0;
    let filtered = values.questions.filter((v) => v !== "undefined");

    questions.map((v, i) => {
      if (Object.values(filtered).includes(v.correct_answer)) {
        correctAnswers++;
      } else {
        inCorrectAnswers++;
      }
    });

    return {
      points: correctAnswers - inCorrectAnswers,
      percentage: (correctAnswers / questionCount) * 100,
    };
  };

  return (
    <Container className="p-5">
      <section
        className="p-5"
        style={{
          borderRadius: 20,
          backgroundColor: "#eee",
        }}
      >
        <Formik initialValues={{ questions: [] }} onSubmit={onSubmit}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className="mb-5">
                <h2 style={{ color: "#0b5ed7", fontSize: 40 }}>
                  <i>Answer the quiz questions</i>
                </h2>
              </div>
              {typeof questions !== "undefined"
                ? questions.map((question, i) => (
                    <div>
                      <Card key={`parent-${i}`} className="p-3 mb-3">
                        <div>{question.question}</div>
                        <Row className="pt-3">
                          <Form.Group
                            className="row"
                            controlId={`question-${i}`}
                          >
                            {question.options.map((v, j) => (
                              <Col
                                key={`parent-${i}-child-${j}`}
                                className="col-6 py-1"
                              >
                                <Form.Check
                                  type="radio"
                                  value={v}
                                  name={`questions[${i}]`}
                                  id={`questions-${i}${j}`}
                                  label={v}
                                  onChange={handleChange}
                                ></Form.Check>
                              </Col>
                            ))}
                          </Form.Group>
                        </Row>
                      </Card>
                    </div>
                  ))
                : null}

              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-primary btn-lg border-radius-0 mt-3 px-5"
                  style={{ borderRadius: 10 }}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </Container>
  );
};
