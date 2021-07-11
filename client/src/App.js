import { Router, Route, Switch } from "react-router-dom";
import ScrollToTop from './ScrollToTop';

import Intronav from './components/Nav'

import Payouts from "./pages/Payouts/Payouts";
import NoMatch from "./pages/NoMatch";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Intro from './pages/Intro/Intro';
import Sleeper from './pages/Sleeper/Sleeper';
import Espn from './pages/Espn/Espn';

import ReportContainer from './ReportContainer.tsx';

import history from './history';

function App() {
  return (
    <Router history={history}>
      <>
        <ScrollToTop/>
        <Intronav />
        <Switch>
          <Route exact path="/" component={Intro} />
          <Route exact path="/weekly-report-sleeper" render={props => <ReportContainer {...props} platform={`sleeper`} type={`weekly`} other={`overall`} />} />
          <Route exact path="/overall-report-sleeper" render={props => <ReportContainer {...props} platform={`sleeper`} type={'overall'} other={`weekly`} />}  />

          <Route exact path="/sleeper" render={Sleeper} />
          <Route exact path="/espn" render={Espn} />

          <Route exact path="/weekly-report-espn" render={props => <ReportContainer {...props} platform={`espn`} type={'weekly'} other={`overall`} />} />
          <Route exact path="/overall-report-espn" render={props => <ReportContainer {...props} platform={`espn`} type={'overall'} other={`weekly`} />}  />


          <Route exact path="/payouts" render={props => <Payouts {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/signup" render={props => <Signup {...props} />} />


          <Route component={NoMatch} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
