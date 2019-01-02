import React from "react";
import axios from "axios"
import api from "../config/api"
import key from "../config/credentials"

class TicketForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: "",
      department: "",
      priority: "",
      message: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    console.log(this.state)
    const formData = {
      name: this.state.name,
      department: this.state.department,
      priority: this.state.priority,
      message: this.state.message
    }

    axios.post(`${api.tickets.baseURL}?api_key=${key}`,formData).then(response => {
      this.props.handleResponse(response.data)
      this.setState({
        name: "",
        department: "",
        priority: "",
        message: ""
      })
    })
  }

  render(){
    return(
      <div>
        <h2>Add Ticket</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group"> 
            <label>Name</label>
            <input type="text" name="name" onChange={this.handleChange} value={this.state.name} className="form-control" />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select name="department" onChange={this.handleChange} value={this.state.department} className="form-control">
              <option value="">Select</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea value={this.state.message} name="message" onChange={this.handleChange} className="form-control"></textarea>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input 
                type="radio"
                value="High"
                checked={this.state.priority === "High"}
                onChange={this.handleChange}
                name="priority"
                className="form-check-input"
              /> High 
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input
                type="radio"
                value="Medium"
                checked={this.state.priority === "Medium"}
                onChange={this.handleChange}
                name="priority"
                className="form-check-input"
              /> Medium
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input
                type="radio"
                value="Low"
                checked={this.state.priority === "Low"}
                onChange={this.handleChange}
                name="priority"
                className="form-check-input"
              /> Low
            </label>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" />or
            <input type="reset" className="btn btn-secondary" />
          </div>
        </form>
      </div>
    )
  }
}

export default TicketForm