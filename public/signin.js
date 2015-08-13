var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
	var username = document.getElementById("username").value;
	var Password = document.getElementById("Password").value;
		if ( username == "Pretty" && Password == "pretty#123"){
			alert ("Login successfully");
			window.location = "Home"; // Redirecting to other page.
		return false;	
		}
		else{
			attempt --;// Decrementing by one.
			alert("You have left "+attempt+" attempt;");
		// Disabling fields after 3 attempts.
			if( attempt == 0){
				document.getElementById("username").disabled = true;
				document.getElementById("Password").disabled = true;
				document.getElementById("Submit").disabled = true;
			return false;
			}
		}
    	/*if (_this == 'login'){
	        document.myform.login.disabled=true;
	        document.myform.logout.disabled=false;
    	}
    	else{
	        document.myform.login.disabled=false;
	        document.myform.logout.disabled=true;
    	}*/
}