import React from 'react';
import axios from "axios";
import api from "../config/api"
import keys from "../config/credentials";
import TicketTable from "./ticketTable";
import TicketForm from "./form"
import SearchForm from './search'
import ProgressBar from './progressBar'

class TicketIndex extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tickets: [],
      filteredTickets: []
    }
    this.handleResponse = this.handleResponse.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    // this.progressBarStatus = this.progressBarStatus.bind(this)
  }

  componentDidMount(){
    axios.get(`${api.tickets.baseURL}?api_key=${keys}`).then(response => 
      {
        this.setState({
          tickets: response.data,
          filteredTickets: response.data
        })
      }
    )
  }

  handleResponse(ticket){
    this.setState(prevState => ({
      tickets: prevState.tickets.concat(ticket),
      filteredTickets: prevState.tickets.concat(ticket)
      })
    )
  }

  handleSearch(code){
    this.setState(prevState => {
      return{
        filteredTickets: prevState.tickets.filter(ticket => ticket.ticket_code.toLowerCase().indexOf(code.toLowerCase()) >= 0)
      }
    })
  }

  handleStatusChange(code,status){
    let ticket = this.state.tickets.find(ticket => ticket.ticket_code === code)
    ticket.status = status
    this.setState(prevState => ({
      tickets: prevState.tickets
      })
    )
  }

  progressBarStatus(){
    let completed = this.state.tickets.filter(ticket => ticket.status === "completed").length
    let total = this.state.tickets.length
    let percentage = ((completed / total) * 100)
    return percentage ? percentage : 0
  }

  render(){
    return(
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8">
                <h2>Listing tickets - {this.state.filteredTickets.length} of {this.state.tickets.length}</h2>
              </div>
              <div className="col-md-4">
                <SearchForm handleSearch={this.handleSearch} />
              </div>
            </div>
          <div className="row">
            <div className="col-md-12">
              <ProgressBar percentage={this.progressBarStatus()}/>
            </div>
          </div>
          <TicketTable tickets={this.state.filteredTickets} handleStatusChange={this.handleStatusChange}/>
          
          </div>
          <div className="col-md-4">
            <TicketForm handleResponse={this.handleResponse}/>
          </div>
      </div>
    )
  }
}


export default TicketIndex