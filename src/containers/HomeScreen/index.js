// Dependencies
import React from 'react'
import { connect } from 'react-redux'

// Actions

// Components
import MainMenu from '../../components/MainMenu'

const HomeScreen = props => (
  <div>
    <MainMenu categories={props.categories} />
  </div>
)

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
