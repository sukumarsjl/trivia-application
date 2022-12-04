import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import appAction from "../stores/app-action";
import appReducer from "../stores/app-reducer";

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = useSelector((state) => state.trivia);
  const categories = useSelector((state) => state.trivia.categories);
  const [randomNumbers, setRandomNumbers] = useState([]);

  useEffect(() => {
    setRandomNumbers(generateMultiplyByNum(30, 5));
    dispatch(appAction.getCategories());
  }, []);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(appReducer.actions.setValues({ ...values }));
    navigate("/question-board");
    setSubmitting(false);
  };

  const generateMultiplyByNum = (num, modulo) => {
    let arr = [];
    for (let i = 0; i <= num; i++) {
      if (i % modulo == 0 && i > 0) {
        arr.push(i);
      }
    }
    return arr;
  };

  return (
    <Container className="p-5 text-center">
      <section
        className="p-5"
        style={{
          borderRadius: 20,
          backgroundColor: "#eee",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={formik.validationSchema}
          onSubmit={onSubmit}
        >
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
                <h2 className="mt-5" style={{ color: "#0b5ed7", fontSize: 40 }}>
                  <i>Trivia Quiz Game!</i>
                </h2>
              </div>
              <Form.Group className="mb-3" controlId="name">
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                  size="lg"
                  style={{ borderRadius: 10 }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="no_of_questions">
                <Form.Select
                  name="no_of_questions"
                  value={values.no_of_questions}
                  onChange={handleChange}
                  isInvalid={touched.no_of_questions && errors.no_of_questions}
                  size="lg"
                  style={{ borderRadius: 10 }}
                >
                  <option value="">- Select No.of Questions -</option>
                  {randomNumbers.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.no_of_questions}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="category">
                <Form.Select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  isInvalid={touched.category && errors.category}
                  size="lg"
                  style={{ borderRadius: 10 }}
                >
                  <option>- Choose Category -</option>
                  {categories.map((v, i) => (
                    <option key={i} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="difficulty">
                <Form.Select
                  name="difficulty"
                  value={values.difficulty}
                  onChange={handleChange}
                  isInvalid={touched.difficulty && errors.difficulty}
                  size="lg"
                  style={{ borderRadius: 10 }}
                >
                  <option>- Choose Difficulty -</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">hard</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.difficulty}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-primary btn-lg border-radius-0 mt-3 px-5"
                  style={{ borderRadius: 10 }}
                  disabled={isSubmitting}
                >
                  Start Quiz!
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </Container>
  );
};

const formik = {
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    no_of_questions: Yup.string().required("Please choose the questions"),
    category: Yup.string().required("Please choose the category"),
    difficulty: Yup.string().required("Please choose the difficulty"),
  }),
};
