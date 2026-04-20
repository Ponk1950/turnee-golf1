import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';
import Table from './Table';
import fetchProjects from '../api/fetchProjects';
class HomePageContainer extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: props.title
    };
  }
  componentDidMount() {
    this.fetchProjects();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title
    });
  }
  fetchProjects = () => {
    fetchProjects().then(serverPlans => {
      this.setState({
        data: serverPlans
      });
    });
  };
  render() {
    const { title, data } = this.state;
    return (
      <PageTemplate title={title}>
        <Table data={data} />
      </PageTemplate>
    );
  }
}
export default HomePageContainer;