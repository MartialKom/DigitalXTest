

async function submitLoginForm(event) {
  event.preventDefault();
  console.log("In submitLoginForm");

  // Afficher le loader
  document.getElementById("loader").style.display = "flex";
  document.getElementById("messageErreur").style.display = "none";
  const button = document.getElementById("loginbutton");

  button.disabled = true;


  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  const data = {
    username: username,
    password: password
};

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch("/auth/login", {
    method: "POST",
    headers:headers,
    body: JSON.stringify(data)
  });

  if(response.status !==200){
    document.getElementById("loader").style.display = "none";
    document.getElementById("messageErreur").style.display = "flex";
    button.disabled = false;
  } else {
    document.getElementById("loader").style.display = "none";
    button.disabled = false;
    window.location.href = '/landing';
  }

}
