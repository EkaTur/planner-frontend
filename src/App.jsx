import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react'
import './App.css'
import { MyPlans } from './MyPlans';
import { getAllPlans, addPlan, editPlan, deletePlan } from './FetchPlans';

function App() {

  const [ myPlan, setMyPlan ] = useState ([]);
  const [ title, setTitle ] = useState('');
  const [ editing, setEditing ] = useState(false);
  const [ planId, setPlanId ] = useState('');

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAllPlans(setMyPlan, user);
    }
  }, [isAuthenticated, user])

  const updatingInput = (_id, title) => {
    setEditing(true)
    setTitle(title)
    setPlanId(_id)
  }
  
  return (
    <div className='MainContainer'>
      {isAuthenticated ? (
        <div className="Flex"> 
          <div className="authContainer">
            <div className="welcomeContainer">
              <h3>Welcome, {user.name}!</h3>
            </div>
            <div className="signContainer"> 
              <button className="signOutButton" onClick={() => logout({ returnTo: window.location.origin })}> Sign out</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="Flex">
        <div className="authContainer">
          <div className="welcomeContainer">
            <h3>Sign in to see your plans</h3>
          </div>
          <div className="signContainer">
            <button className="signInButton" onClick={() => loginWithRedirect()}>Sign in</button>
          </div>
        </div>
        </div>
      )}
        <div className='headerContainer'>
          <h2>My ToDo List</h2>
        </div>
        <div className='inputContainer'>
          <input className='planInput' required type='text' placeholder='Write your plan here ...' value={ title }  onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='buttonContainer'>
          <button className='addButton' onClick={ () => { if(!title.trim()) { alert("Fill the field please!"); return; } editing ? editPlan(planId, title, setMyPlan, setTitle, setEditing, user) : addPlan(title, setTitle, setMyPlan, user)}}>{ editing ? "EDIT" : "ADD" }</button>
        </div>
        <div className="PlansMainContainer">
          {myPlan.map((plan) => (
              <MyPlans key={plan._id} text={plan.title} 
              updatingInput = { () => updatingInput(plan._id, plan.title)} 
              deletePlan = { () => deletePlan(plan._id, setMyPlan, user)} />
            ))}
        </div>
    </div>
  )
}

export default App
