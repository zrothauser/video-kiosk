// Dependencies
import React from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions

// Components

const HomeScreen = props => (
  <div>
    {props.categories.map((category, index) => (
      <p key={index}>
        {category.title}
      </p>
    ))}
  </div>
)

const mapStateToProps = state => {
  const categoriesData = state.categories

  return {
    categories: categoriesData.categories,
    isLoading: categoriesData.isLoading,
    isErrored: categoriesData.isErrored,
    error: categoriesData.error
  }
}

export default connect(
  mapStateToProps
)(HomeScreen)
