import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';

const AdminPageContainer = props => (
  <PageTemplate title={props.title}>Admin Page Content</PageTemplate>
);

AdminPageContainer.propTypes = {
  title: PropTypes.string.isRequired
};

export default AdminPageContainer;