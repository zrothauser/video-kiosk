// Dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';

// Components
import MainMenu from '../../components/MainMenu';

// Actions
import { fetchAppData } from '../../redux/actions/app';

// Styles
import './index.css';

export class HomeScreen extends React.Component {
  renderError() {
    const { error } = this.props;

    // eslint-disable-next-line no-console
    console.error(`API error:  ${error}`);

    return (
      <span className="b-homescreen__error">
        There was an error loading the video data.
        <button
          className="b-homescreen__action"
          onClick={() => this.props.fetchAppData()}
        >
          Try again?
        </button>
      </span>
    );
  }

  renderCategories() {
    const {
      isLoading,
      categories,
      setSlug,
    } = this.props;

    return (
      <MainMenu
        isLoading={isLoading}
        categories={categories}
        setSlug={setSlug}
      />
    );
  }

  render() {
    const {
      isErrored,
      isLoading,
      backgroundVideoID,
    } = this.props;

    // And build the page markup
    return (
      <div className="b-homescreen">
        <div className="b-homescreen__wrapper">
          {backgroundVideoID &&
            <iframe
              className="b-homescreen__background-video"
              title="BackgroundVideo"
              src={`https://player.vimeo.com/video/${backgroundVideoID}?api=1&background=1`}
              frameBorder="0"
            />
          }
          {(isErrored && !isLoading) ? this.renderError() : this.renderCategories()}
        </div>
        <ScrollLock />
      </div>
    );
  }
}

HomeScreen.defaultProps = {
  error: null,
  backgroundVideoID: null,
};

HomeScreen.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isErrored: PropTypes.bool.isRequired,
  error: PropTypes.string,
  backgroundVideoID: PropTypes.number,
  setSlug: PropTypes.string.isRequired,
  fetchAppData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    categories: categoriesData,
    app,
  } = state;

  return {
    categories: categoriesData.categories,
    isLoading: categoriesData.isLoading,
    isErrored: categoriesData.isErrored,
    error: categoriesData.error,
    backgroundVideoID: app.data.backgroundVideo,
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchAppData }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

