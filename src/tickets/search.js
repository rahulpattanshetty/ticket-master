import React from "react";

class SearchForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      search:""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
    this.props.handleSearch(event.target.value)
  }

  render(){
    return(
      <div>
        <form>
          <div className="form-group">
            <input type="text" value={this.state.search} onChange={this.handleChange} name="search" className="form-control" placeholder="Search by code" />
          </div>
        </form>
      </div>
    )
  }
}

export default SearchForm