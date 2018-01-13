// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions

// Components
import MainMenu from '../../components/MainMenu';

export class HomeScreen extends React.Component {
  static renderLoading() {
    return (
      <span>Loading...</span>
    );
  }

  renderError() {
    const { error } = this.props;

    return (
      <span>{error}</span>
    );
  }

  renderCategories() {
    return (
      <MainMenu categories={this.props.categories} />
    );
  }

  render() {
    const {
      isLoading,
      isErrored,
    } = this.props;

    if (isErrored) {
      return this.renderError();
    } else if (isLoading) {
      return HomeScreen.renderLoading();
    }

    return this.renderCategories();
  }
}

HomeScreen.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isErrored: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const categoriesData = state.categories;

  // Only include visible categories
  const visibleCategories = categoriesData.categories.filter(category => category.visibility === 'visible');

  return {
    categories: visibleCategories,
    isLoading: categoriesData.isLoading,
    isErrored: categoriesData.isErrored,
    error: categoriesData.error,
  };
};

export default connect(mapStateToProps)(HomeScreen);
