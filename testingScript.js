  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB_fT7zK-Kzytne1aj0S3S6a6leKNfVUYM",
    authDomain: "covid-19-31b0c.firebaseapp.com",
    databaseURL: "https://covid-19-31b0c-default-rtdb.firebaseio.com",
    projectId: "covid-19-31b0c",
    storageBucket: "covid-19-31b0c.appspot.com",
    messagingSenderId: "12229224469",
    appId: "1:12229224469:web:b3730b548e755bd7a2461c"
  };
  firebase.initializeApp(firebaseConfig);


  
  /* Validation of data collected through form,
  on click event of Submit button, submitForm function is called */
  var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit',submitForm);

  /* function store input values in variables */
  function submitForm(e){
    e.preventDefault();
    var fname =getInputVal('firstname');
    var fname =getInputVal('lastname');
    var fname =getInputVal('mobile');
    var fname =getInputVal('state');
    state=state.toLowerCase();
    readstate(state);
    var fname =getInputVal('email');
    var emailstatus=validateEmail();
    var fname =getInputVal('profession');
    var fname =getInputVal('dateofbirth');
    var symptomslist=getSelectedCheckboxValues();
    // Add more variables to get input values
    

    var selectedOption = document.querySelector('input[name = option]:checked').value;
    /* function call to store data values in firebase
    after email id validation  */
    if(emailstatus)
    saveMessages(lname+ " " +fname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}

/* function to accept state value as parameter, read database
 to return and display center details on web page */
function readstate(state){
  var centers;
  var ref=firebase.database;
  ref.on('value',(data)=>{
  centers=data.val();
  document.getElementById("results").innerHTML="<br>"+centers.toUpperCase();
}
  )
}


/* function to return input values as per the id passed as parameter */
function getInputVal(id){
    return document.getElementById(id).value;
}

/* function to write collected details in firebase,
create new record and add values in respective fields */
function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOptions,symptomslist){
var newuserInputsRef=UserInputsRef.push();
newuserInputsRef.selectedOption({
  name:name,
  mobile:mobile,
  email:email,
  profession:profession,
  dateofbirth:dateofbirth,
  selectedOption:selectedOption,
  state:state,
  symptomsList:symptomsList
})
alert("Thank you, find the list of your centers nearby!");
}




/* function to return value(s) of selcted checkboxes */
function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

/* function to check if email id entered by user is valid */
function validateEmail() 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}