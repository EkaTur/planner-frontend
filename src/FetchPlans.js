import axios from 'axios';

const getAllPlans = (setMyPlan) => {
    axios.get("https://planner-backend-9waq.onrender.com")
    .then(({ data }) => {
        console.log(data)
        setMyPlan(data);
    })
}

const addPlan = (title, setTitle, setMyPlan) => {
    axios.post("https://planner-backend-9waq.onrender.com/savePlans", { title })
    .then ((data) => {
        console.log(data);
        setTitle('')
        getAllPlans(setMyPlan)
    })
}

const editPlan = (planId, title, setMyPlan, setTitle, setEditing) => {
    axios.put("https://planner-backend-9waq.onrender.com/editPlan", { _id: planId, title })
    .then((data) => {
        console.log(data);
        setTitle('');
        setEditing(false)
        getAllPlans(setMyPlan)
    })
}

const deletePlan = (_id, setMyPlan) => {
    axios.post("https://planner-backend-9waq.onrender.com/deletePlan", { _id })
    .then((data) => {
        console.log(data)
        getAllPlans(setMyPlan)
    })
}

export {getAllPlans, addPlan, editPlan, deletePlan} ;