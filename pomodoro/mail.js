// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCHFZ3ZQikbZfOLKIp3Xgf8JWboXqhPUdA",
    authDomain: "pomodoro-3e99d.firebaseapp.com",
    databaseURL: "https://pomodoro-3e99d-default-rtdb.firebaseio.com",
    projectId: "pomodoro-3e99d",
    storageBucket: "pomodoro-3e99d.appspot.com",
    messagingSenderId: "596462895190",
    appId: "1:596462895190:web:c28ded9f5520db70a7fbf7",
    measurementId: "G-169VN2YJ3Z"
};
firebase.initializeApp(firebaseConfig);

// Reference to the database
const database = firebase.database();

// Define the submitForm function
function goalForm(e) {
    e.preventDefault();

    const goalInput = getElementVal('goalInput');
    const deadlineInput = getElementVal('deadlineInput');
    saveGoal(goalInput, deadlineInput);

    // Display success message
    alert('Goal added successfully.');

    // Reset the form
    document.getElementById('goalForm').reset();

    // Display the added goal in the list
    addGoalToList(goalInput, deadlineInput);
}

// Function to save goal to Firebase
function saveGoal(goalInput, deadlineInput) {
    const goalsRef = database.ref('goals');
    const newGoalRef = goalsRef.push();
    newGoalRef.set({
        goal: goalInput,
        deadline: deadlineInput
    });
}

// Attach event listener to the form
document.getElementById('goalForm').addEventListener('submit', goalForm);

// Function to get element values by ID
function getElementVal(id) {
    return document.getElementById(id).value;
}

// Function to add the goal to the list
function addGoalToList(goalText, deadlineText) {
    const goalList = document.getElementById('goalList');
    const li = document.createElement('li');
    li.textContent = `Goal: ${goalText} - Deadline: ${deadlineText}`;
    goalList.appendChild(li);
}

// Retrieve goals from Firebase and display them
function retrieveGoals() {
    const goalsRef = database.ref('goals');
    goalsRef.on('value', function(snapshot) {
        const goals = snapshot.val();
        for (let key in goals) {
            const goal = goals[key];
            addGoalToList(goal.goal, goal.deadline);
        }
    });
}            

// Call the retrieveGoalsAndDeadlines function to display goals and deadlines on page load
window.onload = retrieveGoals;


