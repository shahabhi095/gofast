import { useEffect, useState } from 'react'
import './styles/App.css'
import axios from 'axios'
import DisplayTickets from "./component/displayTickets";

function App() {
  const [ticketStatus, setTicketStatus] = useState([])
 const [userInput, setUserInput] = useState(null)
  const [message, setMeassage] = useState("");

//getting ticket details 
const GetData = async()=>{
try {
  let getAllseats = await axios.get(
    `https://godaddy.onrender.com/ticket`
  );
  setTicketStatus(getAllseats.data);
} catch (err) {
  console.log(err);
}
  }

  useEffect(()=>{
 GetData();
  },[message])
//reset coach
const HandleReset= async()=>{
try {
  let res = await axios.get(`https://godaddy.onrender.com/reset`);
   setMeassage(res.data.seat);
} catch (err) {
  console.log(err);
}
}

//on input
  const handleChange=(e)=>{
    setUserInput(e.target.value);
  }


const handleSubmit=async()=>{
  console.log(userInput);
    try {
      let res = await axios.post(
        `https://godaddy.onrender.com/ticket`,
        { number_of_seats: userInput }
      );
     
     setMeassage(res.data.seat);
       GetData();
    } catch (err) {
      console.log(err);
    }
  
}
  return (
    <>
      <div className="MainContainer">
        <div className="inputContainer">
          <div className="BookingCounter">
            <button className="Reset" onClick={HandleReset}>
              Reset Coach
            </button>
            <h1 className="heading">Book Ticket online on Unstop </h1>
            <input
              type="number"
              value={userInput}
              onChange={handleChange}
              placeholder="Enter Number of ticket"
            />
            <button className="BookButton" onClick={handleSubmit}>
              {" "}
              Book
            </button>
            <h1
              style={{
                display: message.length ? "block" : "none",
                color: " #181064",
              }}
            >
              {message}
            </h1>
          </div>
        </div>

        <div className="container">
          <h1 className="heading">Check seats availability </h1>
          {ticketStatus &&
            ticketStatus.map((item, i) => (
              <div className="TickeContainer" key={100 * i}>
                {item.map((el, j) => (
                  <DisplayTickets
                    key={1000 * j}
                    el={el}
                    seatNum={i * 7 + j + 1}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App
