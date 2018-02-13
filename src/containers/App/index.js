// Dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

// Other containers
import HomeScreen from '../HomeScreen';
import CategoryScreen from '../CategoryScreen';
import VideoScreen from '../VideoScreen';
import VideoIndex from '../VideoIndex';

// Components
import Header from '../../components/Header';

// Actions
import { toggleVideoIndex } from '../../redux/actions/app';

// Styles
import './index.css';

export const App = props => (
  <div className="b-app">
    <Header toggleVideoIndex={props.toggleVideoIndex} />

    <main className="b-main">
      <Route render={({ location }) => (
        <ReactCSSTransitionReplace
          transitionName="fade-fast"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div key={location.pathname}>
            <Switch location={location}>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/category/:slug" component={CategoryScreen} />
              <Route path="/video/:id" component={VideoScreen} />
            </Switch>
          </div>
        </ReactCSSTransitionReplace>
      )}
      />
    </main>

    {props.isVideoIndexOpen &&
      <VideoIndex />
    }
  </div>
);

App.propTypes = {
  isVideoIndexOpen: PropTypes.bool.isRequired,
  toggleVideoIndex: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const interfaceState = state.app.interface;

  return {
    isVideoIndexOpen: interfaceState.isVideoIndexOpen,
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ toggleVideoIndex }, dispatch));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
