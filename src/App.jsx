import { useState, useEffect } from 'react'
import Feedbeck from './components/Feedback/Feedback';
import Options from './components/Options/Options';
import DescriptionJSON from './components/Description/DescriptionJSON.json'
import Description from './components/Description/Description';
import '../src/App.css'
import Notification from './components/Notification/Notification'

const App = () => {
  const state = {
    good: 0,
    neutral: 0,
    bad: 0,
	  }
    
  const [values, setValues] = useState(() => {
    const savedValues = JSON.parse(window.localStorage.getItem("saved-values"));
  return savedValues || state
})


  useEffect(() => {window.localStorage.setItem("saved-values", JSON.stringify(values))}, [values])
	
	function updateFeedback(feedbackType){
			setValues({
			...values,
			[feedbackType]: values[feedbackType] + 1
		});
	};

  function resetMaker(){
    setValues({
			...state
		});
}

function totalMaker(){
  let total = 0;
for(const item of Object.values(values)){
total+=item
}
return total
}
const totalFeedbackCount = totalMaker()


  return (
    <div className='mainContainer'>
<Description title={DescriptionJSON.title} text={DescriptionJSON.text}/>
<div className='box'>
      <Options obj={state} update={updateFeedback} reset={resetMaker} total={totalFeedbackCount}/>
      {totalFeedbackCount ? <button className='btn' type="button" onClick={resetMaker}>Reset</button> : ""}
      </div>

      {totalFeedbackCount ? <Feedbeck value={values} obj={state} total={totalFeedbackCount}/> : <Notification text={'No feedback yet'}/>}
    
    </div>
  );
}

export default App
