import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Navigator from "./navigator";
import Store from "./stores";

function App() {
  return (
    <BrowserRouter>
      <Provider store={Store}>
        <Navigator />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
