import React, { Component } from 'react';
import TicketIndex from "./tickets/index"


class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="mt-4">
          <h2>Ticket Master</h2>
          <TicketIndex />
        </div>
        
      </div>
    );
  }
}

export default App;
