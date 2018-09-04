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
import {
  fetchAppData,
  toggleVideoIndex,
  closeVideoIndex,
} from '../../redux/actions/app';

// Styles
import './index.css';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAppData(this.props.setSlug);
  }

  render() {
    const {
      showHeader,
      isVideoIndexOpen,
      setSlug,
    } = this.props;

    return (
      <div className="b-app">
        <Header
          toggleVideoIndex={this.props.toggleVideoIndex}
          closeVideoIndex={this.props.closeVideoIndex}
          visible={showHeader}
        />

        <main className="b-main">
          <Route render={({ location }) => (
            <ReactCSSTransitionReplace
              transitionName="fade-fast"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              <div key={location.pathname}>
                <Switch location={location}>
                  <Route exact path="/" render={() => <HomeScreen setSlug={setSlug} />} />
                  <Route exact path="/:set" render={() => <HomeScreen setSlug={setSlug} />} />

                  <Route path="/:set/:categorySlug/:id" component={VideoScreen} />
                  <Route path="/:set/:categorySlug" component={CategoryScreen} />
                </Switch>
              </div>
            </ReactCSSTransitionReplace>
          )}
          />
        </main>

        <VideoIndex visible={isVideoIndexOpen} />
      </div>
    );
  }
}

App.defaultProps = {
  setSlug: 'media-channel',
};

App.propTypes = {
  fetchAppData: PropTypes.func.isRequired,
  isVideoIndexOpen: PropTypes.bool.isRequired,
  toggleVideoIndex: PropTypes.func.isRequired,
  closeVideoIndex: PropTypes.func.isRequired,
  showHeader: PropTypes.bool.isRequired,
  setSlug: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const interfaceState = state.app.interface;
  const videoPlayerInterface = state.videoPlayer.interface;
  const { location } = state.routing;

  const setSlug = ownProps.location.pathname.replace(/\//g, '') || ownProps.setSlug;

  // If we're on the video player page and controls
  // are hidden, the header bar should be hidden as well.
  // But not if the Video Index is open.
  const isVideoPlayerOpen = location.pathname && location.pathname.includes('/video/');
  const showHeader = isVideoPlayerOpen ?
    videoPlayerInterface.showControls || interfaceState.isVideoIndexOpen :
    true;

  return {
    isVideoIndexOpen: interfaceState.isVideoIndexOpen,
    showHeader,
    setSlug,
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchAppData, toggleVideoIndex, closeVideoIndex }, dispatch));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
