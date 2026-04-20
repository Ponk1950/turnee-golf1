import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';

const CreatePageContainer = props => (
  <PageTemplate title={props.title}>Create Page Content</PageTemplate>
);

CreatePageContainer.propTypes = {
  title: PropTypes.string.isRequired
};

export default CreatePageContainer;