import { useEffect, useState } from 'react'
import './App.css'
import { MyPlans } from './MyPlans';
import { getAllPlans, addPlan, editPlan, deletePlan } from './FetchPlans';

function App() {

  const [ myPlan, setMyPlan ] = useState ([]);
  const [ title, setTitle ] = useState('');
  const [ editing, setEditing ] = useState(false);
  const [ planId, setPlanId ] = useState('');

  useEffect(() => {
    getAllPlans(setMyPlan);
  }, [])

  const updatingInput = (_id, title) => {
    setEditing(true)
    setTitle(title)
    setPlanId(_id)
  }
  
  return (
    <div className='MainContainer'>
        <div className='headerContainer'>
          <h2>My ToDo List</h2>
        </div>
        <div className='inputContainer'>
          <input className='planInput' type='text' placeholder='Write your plan here ...' value={ title }  onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='buttonContainer'>
          <button className='addButton' onClick={ editing ? () => editPlan(planId, title, setMyPlan, setTitle, setEditing) : () => addPlan(title, setTitle, setMyPlan)}>{ editing ? "EDIT" : "ADD" }</button>
        </div>
        <div>
        {myPlan.map((plan) => (
          <MyPlans key={plan._id} text={plan.title} 
          updatingInput = { () => updatingInput(plan._id, plan.title)} 
          deletePlan = { () => deletePlan(plan._id, setMyPlan)} />
        ))}
        </div>
    </div>
  )
}

export default App
