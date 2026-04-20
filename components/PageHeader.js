import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageTitle from './PageTitle';

const StyledPageHeader = styled.div`
 margin-left: 180px;
 margin-top: 1rem;
 padding-left: 2rem;
 display: flex;
 justify-content: space-between;
 width: calc(100% - 180px);
`;
const PageHeader = props => (
  <StyledPageHeader>
    <PageTitle title={props.title} />
    {props.children}
  </StyledPageHeader>
);
PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};
PageHeader.defaultProps = {
  children: ''
};
export default PageHeader;