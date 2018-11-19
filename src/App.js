import React, { Component } from 'react';
import './App.css';
import jobType from './data/jobType';
import jobLevel from './data/jobLevel';
import companySize from './data/companySize';
import jobLocation from './data/jobLocation';
import Autocomplete from './controllers/autoSuggest';
import BootstrapModal from './controllers/modal';
import JobCard from './controllers/jobCard';
import Pagination from './controllers/pagination';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobType,
      jobLevel,
      companySize,
      jobLocation,
      jobTypeSelected: [],
      jobLevelSelected: [],
      companySizeSelected: [],
      jobLocationSelected: [],
      page: 0,
      pages: 1,
      results: [],
      showModal: false,
      activeJob: {
        title: '',
        link: '',
        company: '',
        description: ''
      }
    };
  }

  buildquery = (name, values) => {
    if (!this.state[values].length) {
      return '';
    }
    return `&${name}=${this.state[values].map(item => encodeURIComponent(item)).join('&')}`;
  }

  getJobs() {
    const API = 'https://www.themuse.com/api/public/jobs?';
    const category = this.buildquery('category', 'jobTypeSelected');
    const level = this.buildquery('level', 'jobLevelSelected');
    const size = this.buildquery('size', 'companySizeSelected');
    const location = this.buildquery('location', 'jobLocationSelected');
    const page = this.state.page;

    fetch(`${API}page=${page}${category}${level}${size}${location}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          results: json.results,
          pages: json.page_count,
          page: json.page,
        });
      });
  }

  handlePageination(nextPage) {
    this.setState({ page: nextPage }, this.getJobs);
  }

  showModal(title = '', link = '', company = '', description = '') {
    this.setState({ 
      activeJob: {
        title: title,
        link: link,
        company: company,
        description: description,
      },
      showModal: true,
    });
  }

  hideModal() {
    this.setState({ 
      showModal: false,
    });
  }

  buildGrid() {
    return this.state.results.map(item => {
      return <JobCard 
        key={item.id}
        company={item.company.name}
        levels={item.levels}
        locations={item.locations}
        contents={item.contents}
        name={item.name}
        link={item.refs.landing_page}
        date={item.publication_date}
        action={this.showModal.bind(this, item.name, item.refs.landing_page, item.company.name, item.contents)}
      />;
    });
  }

  handleInput = (name, items) => {
    this.setState({ [name]: items });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.jobTypeSelected !== prevState.jobTypeSelected ||
      this.state.jobLevelSelected !== prevState.jobLevelSelected ||
      this.state.companySizeSelected !== prevState.companySizeSelected ||
      this.state.jobLocationSelected !== prevState.jobLocationSelected) {
      this.getJobs();
    }
  }

  getPageination() {
    if (this.state.results.length) {
      return <Pagination current={this.state.page} total={this.state.pages} action={this.handlePageination.bind(this)} />
    }
    return;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="page-header">
                <h1>
                  Simple Job Search
                </h1>
                <small>Powered by The Muse</small>
              </div>
            </div>

            {this.getPageination()}

            <form action="" method="GET">
              <div className="row">
                  <Autocomplete
                    list={this.state.jobType}
                    action={this.handleInput.bind(this, 'jobTypeSelected')}
                    placeHolder="Job Title..."
                    name="Job Title"
                  />
                  <Autocomplete 
                    list={this.state.jobLevel}
                    action={this.handleInput.bind(this, 'jobLevelSelected')}
                    placeHolder="Experience Level..."
                    name="Experience Level"
                  />
                  <Autocomplete
                    list={this.state.companySize}
                    action={this.handleInput.bind(this, 'companySizeSelected')}
                    placeHolder="Company Size..."
                    name="Company Size"
                  />
                  <Autocomplete
                    list={this.state.jobLocation}
                    action={this.handleInput.bind(this, 'jobLocationSelected')}
                    placeHolder="Loction..."
                    name="Loction"
                  />
              </div>
            </form>
            <div className="row">
              {this.buildGrid()}
            </div>
          </div>
        </div>
        <BootstrapModal
          title={this.state.activeJob.title}
          link={this.state.activeJob.link}
          company={this.state.activeJob.company}
          details={this.state.activeJob.description}
          showModal={this.state.showModal}
          close={this.hideModal.bind(this)} />
      </div>
    );
  }
}

export default App;
