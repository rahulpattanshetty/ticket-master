import React from "react";
import axios from "axios"
import api from "../config/api"
import key from '../config/credentials';

class TicketRow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false
    }
    this.handleCheck = this.handleCheck.bind(this)
  }
  handleCheck(){
    this.setState({
      loading: true
    })
    axios.put(`${api.tickets.baseURL}/${this.props.ticket_code}?api_key=${key}`,{status: this.props.status === "open" ? "completed" : "open"}).then(response => {
      this.props.handleStatusChange(this.props.ticket_code, response.data.status)
      this.setState({
        loading: false
      })
    })
  }
  render(){
    const { ticket_code, name, department, priority, message, status} = this.props
    return (
      <tr>
        <td> {ticket_code} </td>
        <td> {name} </td>
        <td> {department} </td>
        <td> {priority} </td>
        <td> {message} </td>
        <td> <input 
                type="checkbox" 
                checked={status === "open" ? false : true} 
                onChange={this.handleCheck}
                disabled={this.state.loading}
              /> 
              {this.state.loading && <img src="http://www.thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif" alt="spinner" height="32" width="32"/>}
        </td>
      </tr>
    )     
  }   
}
export default TicketRow
