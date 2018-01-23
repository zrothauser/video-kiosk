// Dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

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
  <div>
    <Header toggleVideoIndex={props.toggleVideoIndex} />
    <main className="b-main">
      <Route exact path="/" component={HomeScreen} />
      <Route path="/category/:slug" component={CategoryScreen} />
      <Route path="/video/:id" component={VideoScreen} />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleVideoIndex }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
