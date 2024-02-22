async function submitregisterform(event) {
    event.preventDefault();
    console.log("In submitregisterform");
  
    // Afficher le loader
    document.getElementById("loader").style.display = "flex";
    document.getElementById("messageErreur").style.display = "none";
    document.getElementById("messageSuccess").style.display = "none";
    const button = document.getElementById("registerbutton");
    const formulaire = document.getElementById("registerform");
  
    button.disabled = true;
  
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
  
    const data = {
      username: username,
      password: password,
      email: email
  };
  
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    const response = await fetch("/auth/register", {
      method: "POST",
      headers:headers,
      body: JSON.stringify(data)
    });
  
    if(response.status !==201){
      document.getElementById("loader").style.display = "none";
      document.getElementById("messageErreur").style.display = "flex";
      button.disabled = false;
    } else {
      document.getElementById("loader").style.display = "none";
      document.getElementById("messageSuccess").style.display = "flex";
      formulaire.reset();
      button.disabled = false;
    }
  
  }