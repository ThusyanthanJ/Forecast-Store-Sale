import './App.css';
import Header from './screens/header';
import Footer from './screens/footer';
import { useState,useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function App() {
  const [predictionResult, setPredictionResult] = useState(null); // State to hold prediction result

  useEffect(()=>{
    axios.get('http://localhost:5000/')
    .then((response)=>{
        console.log("success")
    })
    .catch((error)=>{
        console.error('Error fetching data:', error);
    });
  },[]);

  const optionList1 = [];
  const optionList2 = [];
  const optionList_family = ['AUTOMOTIVE',
  'BABY CARE',
  'BEAUTY',
  'BEVERAGES',
  'BOOKS',
  'BREAD/BAKERY',
  'CELEBRATION',
  'CLEANING',
  'DAIRY',
  'DELI',
  'EGGS',
  'FROZEN FOODS',
  'GROCERY I',
  'GROCERY II',
  'HARDWARE',
  'HOME AND KITCHEN I',
  'HOME AND KITCHEN II',
  'HOME APPLIANCES',
  'HOME CARE',
  'LADIESWEAR',
  'LAWN AND GARDEN',
  'LINGERIE',
  'LIQUOR,WINE,BEER',
  'MAGAZINES',
  'MEATS',
  'PERSONAL CARE',
  'PET SUPPLIES',
  'PLAYERS AND ELECTRONICS',
  'POULTRY',
  'PREPARED FOODS',
  'PRODUCE',
  'SCHOOL AND OFFICE SUPPLIES',
  'SEAFOOD'];
  for (let i = 1; i <= 54; i++) {
    const option1 = {
      value: i.toString(),
      label: `Store_${i}`,
    };
  
    optionList1.push(option1);
  }
 
  for (let j=0; j<=32; j++){
    const option2 = {
      value: j.toString(),
      label: optionList_family[j],
    };

    optionList2.push(option2);
  }

  const [selectedOptionstore, setselectedOptionstore] = useState();

  function handleSelectstore(data){
    setselectedOptionstore(data);

  }

  const [selectedOptionitem, setselectedOptionitem] = useState();

  function handleSelectitem(data){
    setselectedOptionitem(data);

  }

  const [selectedDate, setselectedDate] = useState();

  function handleSelectdate(data){
    setselectedDate(data);
    console.log(selectedDate)
  }

  const minDate = new Date("2017-08-16");
  const maxDate = new Date("2017-08-31");

  function send_data(){
    if(selectedOptionstore && selectedOptionitem && selectedDate){ 
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed
      const day = String(selectedDate.getDate()).padStart(2, '0');
  
      const utcDate = `${year}-${month}-${day}`;
      
      axios.post('http://localhost:5000/predict',{
        store_nbr: selectedOptionstore.value,
        family_nbr: selectedOptionitem.value,
        date: utcDate
      })
      .then((response)=>{
        console.log(response.data);
        setPredictionResult(response.data);
      })
      .catch((error)=>{
        console.log('Error sending data: ', error);
      });
    } else{
      alert('please select all required data.')
    }
  }
  
  return (
    <div className='App'>
      <Header/>
          <div id='store-inline'>
            <div className='left-store'>
              <h2 id='store-option'>
                Select the Store
              </h2>
              <Select options={optionList1} 
                      placeholder='Select Store' 
                      value={selectedOptionstore}
                      onChange={handleSelectstore}
                      isSearchable={true}
                      className='store-option'
                      id="store_nbr"
                      />
            </div>
            <div className='right-store'>
              <h2>
                Select the Product Family
              </h2>
              <Select options={optionList2} 
                      placeholder='Select Item' 
                      value={selectedOptionitem}
                      onChange={handleSelectitem}
                      isSearchable={true}
                      className='store-option'
                      id='family_nbr'
                      />
            </div>
          </div>
          
          <div className='date'>
          <h2>
            Pick A Date
          </h2>
            <DatePicker selected={selectedDate} 
                        onChange={handleSelectdate}
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFormat="yyyy-MM-dd"
                        id='date-picker'
                        />
                        <h2> </h2>
          </div>
          <div className='button'>
            <button className="btn" id='prediction' onClick={send_data}>
              <span className="text" >
                Predict The Sale
              </span>
              <span className="loading-animate"></span>
            </button>
          </div>
          <div className='sales-value'>
            <h2>
              Prediction Result: 
            </h2>
            <h1>
              ${predictionResult}
            </h1>
          </div>
       
        
      <Footer className="App-footer1"/>  
    </div>
  );
}

export default App;
