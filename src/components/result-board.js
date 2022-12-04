import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import appReducer from "../stores/app-reducer";

export default (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const values = useSelector((state) => state.trivia);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, []);

  const resetUser = () => {
    dispatch(appReducer.actions.reset());
    navigate("/");
  };

  return location.state != null ? (
    <Container className="p-5 text-center ">
      <div className="border border-success py-4">
        <div className="py-3">
          <h1>Your Score is:</h1>
          <h2 style={{ color: "#999" }}>{location.state.score.points}</h2>
        </div>

        {location.state.score.percentage == 100 && (
          <div style={{ fontSize: 30, color: "red" }}>
            WOW! You are a Genius {values.name}
          </div>
        )}
        {location.state.score.percentage > 80 && (
          <div style={{ fontSize: 30, color: "red" }}>
            Great Job {values.name}
          </div>
        )}
        {location.state.score.percentage >= 50 &&
          location.state.score.percentage <= 80 && (
            <div style={{ fontSize: 30, color: "red" }}>
              You could do better {values.name}
            </div>
          )}
        {location.state.score.percentage < 50 && (
          <div style={{ fontSize: 30, color: "red" }}>
            Oh No! You need some groundwork {values.name}
          </div>
        )}
      </div>

      <div className="py-4">
        <Button
          variant="primary"
          type="submit"
          className="btn-primary btn-lg border-radius-0 mt-3 px-5"
          style={{ borderRadius: 10 }}
          onClick={resetUser}
        >
          Try Again
        </Button>
      </div>
    </Container>
  ) : null;
};
