// Dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
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
  fetchAppSettings,
  fetchAppData,
  toggleVideoIndex,
  closeVideoIndex,
} from '../../redux/actions/app';

// Styles
import './index.css';

export class App extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    const { setSlug } = this.props;

    if (setSlug) {
      this.props.fetchAppData(setSlug);
    } else {
      this.props.fetchAppSettings();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      setSlug,
      defaultSet
    } = this.props;

    if (
      defaultSet !== prevProps.defaultSet &&
      setSlug !== defaultSet
    ) {
      this.setState({
        shouldRedirect: true,
      });
    } else if (this.state.shouldRedirect === true) {
      this.setState({
        shouldRedirect: false,
      });
    }

    if (setSlug !== prevProps.setSlug) {
      this.props.fetchAppData(setSlug);
    }
  }

  /**
   * The redirect should happen if the user hits the homepage, and the app
   * gets the default Set name from the API then needs to go to that set.
   */
  renderRedirect() {
    return (
      <Redirect to={`/${this.props.defaultSet}/`} />
    );
  }

  renderApp() {
    const {
      showHeader,
      isVideoIndexOpen,
      homeURL,
    } = this.props;

    return (
      <div className="b-app">
        <Header
          toggleVideoIndex={this.props.toggleVideoIndex}
          closeVideoIndex={this.props.closeVideoIndex}
          visible={showHeader}
          homeURL={homeURL}
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
                  <Route exact path="/" render={() => <HomeScreen />} />
                  <Route exact path="/:set" render={() => <HomeScreen />} />

                  <Route exact path="/:set/:categorySlug/:id" component={VideoScreen} />
                  <Route exact path="/:set/:categorySlug" component={CategoryScreen} />
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

  render() {
    return this.state.shouldRedirect ? this.renderRedirect() : this.renderApp();
  }
}

App.propTypes = {
  fetchAppSettings: PropTypes.func.isRequired,
  fetchAppData: PropTypes.func.isRequired,
  isVideoIndexOpen: PropTypes.bool.isRequired,
  toggleVideoIndex: PropTypes.func.isRequired,
  closeVideoIndex: PropTypes.func.isRequired,
  showHeader: PropTypes.bool.isRequired,
  setSlug: PropTypes.string.isRequired,
  defaultSet: PropTypes.string.isRequired,
  homeURL: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const {
    settings,
    selectedSet,
    interface: interfaceState,
  } = state.app;
  const videoPlayerInterface = state.videoPlayer.interface;
  const { location } = state.routing;

  const urlPathParts = ownProps.location.pathname.split('/');
  const setSlug = urlPathParts[1] || '';

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
    defaultSet: settings.defaultSet,
    homeURL: `/${selectedSet}/`,
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchAppSettings,
    fetchAppData,
    toggleVideoIndex,
    closeVideoIndex,
  }, dispatch));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
