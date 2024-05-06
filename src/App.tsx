/** @jsxImportSource @emotion/react */
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./App.styles";
import CardEnrollmentCompleteView from "./components/CardEnrollmentCompleteView/CardEnrollmentCompleteView";
import CardForm from "./components/CardForm/CardForm";

function App() {
  return (
    <Router>
      <main css={Layout}>
        <Routes>
          <Route path="/" element={<CardForm />} />
          <Route
            path="/enrollmentCompleted"
            element={<CardEnrollmentCompleteView />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
