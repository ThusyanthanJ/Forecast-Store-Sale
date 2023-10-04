import logo1 from '../store.png'
import '../App.css';
import React, {useEffect} from 'react';
import axios from 'axios';

function Header() {
    // const [data, setData] = useState({});
    useEffect(()=>{
        axios.get('http://localhost:5000/')
        .then((response)=>{
            console.log("success")
            // setData(response.data);
        })
        .catch((error)=>{
            console.error('Error fetching data:', error);
        });
    },[]);
  return (
    <header className="App-header">
        <img src={logo1} className="App-logo" alt="logo" />
        <h1 className='App-title'>
          Store Sale Forecasting
        </h1>  
    </header>  
  );
}

export default Header;





