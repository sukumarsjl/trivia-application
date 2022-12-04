import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Notfound from "./components/notfound";
import QuestionBoard from "./components/question-board";
import ResultBoard from "./components/result-board";

export default Navigator = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question-board" element={<QuestionBoard />} />
      <Route path="/result-board" element={<ResultBoard />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
