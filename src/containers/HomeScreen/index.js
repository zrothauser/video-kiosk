// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

// Actions

// Components
import MainMenu from '../../components/MainMenu'

export const HomeScreen = props => (
  <div>
    <MainMenu categories={props.categories} />
  </div>
)

HomeScreen.defaultProps = {
  categories: [],
	isLoading: true,
	isErrored: false,
	error: false
}

HomeScreen.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
	isLoading: PropTypes.bool.isRequired,
	isErrored: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  const categoriesData = state.categories

  // Only include visible categories
  const visibleCategories = categoriesData.categories.filter(category => category.visibility === 'visible')

  return {
    categories: visibleCategories,
    isLoading: categoriesData.isLoading,
    isErrored: categoriesData.isErrored,
    error: categoriesData.error
  }
}

export default connect(
  mapStateToProps
)(HomeScreen)
