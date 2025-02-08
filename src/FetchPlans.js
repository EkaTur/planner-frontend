import axios from 'axios';

const getAllPlans = (setMyPlan, user) => {
    if (!user) return;
    axios.get(`https://planner-backend-4k41.onrender.com?userId=${user.sub}`)
        .then(({ data }) => setMyPlan(data));
}

const addPlan = (title, setTitle, setMyPlan, user) => {
    if (!user) return;
    axios.post("https://planner-backend-4k41.onrender.com/savePlans", { title, userId: user.sub })
        .then(() => {
            setTitle('');
            getAllPlans(setMyPlan, user);
        });
}

const editPlan = (planId, title, setMyPlan, setTitle, setEditing, user) => {
    if (!user) return;
    axios.put("https://planner-backend-4k41.onrender.com/editPlan", { _id: planId, title, userId: user.sub })
        .then(() => {
            setTitle('');
            setEditing(false);
            getAllPlans(setMyPlan, user);
        });
}

const deletePlan = (_id, setMyPlan, user) => {
    if (!user) return;
    axios.post("https://planner-backend-4k41.onrender.com/deletePlan", { _id, userId: user.sub })
        .then(() => getAllPlans(setMyPlan, user));
}

export {getAllPlans, addPlan, editPlan, deletePlan} ;