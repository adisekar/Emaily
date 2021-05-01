import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


const Header = () => {
  return (
    <div>
      Header
    </div>
  );
}

const Dashboard = () => {
  return (
    <div>
      Dashboard
    </div>
  );
}

const SurveyNew = () => {
  return (
    <div>
      SurveyNew
    </div>
  );
}

const Landing = () => {
  return (
    <div>
      Landing
    </div>
  );
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
