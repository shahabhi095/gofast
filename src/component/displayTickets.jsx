//import React from 'react'
import "../styles/ticket.css";
const DisplayTickets = ({ el, seatNum }) => {
  return (
    <div
    className="TicketCard"
      style={{
        width: "50px",
        height: "25px",
        margin: "5px",
        padding:"5px",
        color: "white",
        textAlign:"center",
        backgroundColor: el ? "green" : "black",
      }}
    >
      {seatNum}
    </div>
    
  );
};

export default DisplayTickets
