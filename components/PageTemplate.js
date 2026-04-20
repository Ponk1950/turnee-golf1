import React from 'react';
import PropTypes from 'prop-types'
import PageContainer from './PageContainer';
import PageHeader from './PageHeader';
import Sidebar from './Sidebar';
import PageContent from './PageContent';

const PageTemplate = props => (
  <PageContainer>
    <Sidebar />
    <PageHeader title={props.title} />
    <PageContent displayBlock="true">{props.children}</PageContent>
  </PageContainer>
);
PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};
PageTemplate.defaultProps = {
  children: ''
}
export default PageTemplate;