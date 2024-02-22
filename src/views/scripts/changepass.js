async function submitChangeForm(event) {
  event.preventDefault();
  console.log("In submitresetform");

  document.getElementById("loader").style.display = "flex";
  document.getElementById("messageErreur").style.display = "none";
  document.getElementById("messageSuccess").style.display = "none";
  const button = document.getElementById("changebutton");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var password = document.getElementById("password").value;
  var passwordC = document.getElementById("passwordC").value;

  if (password !== passwordC) {
    document.getElementById("messageErreur").textContent =
      "Entrez la même valeur pour les deux champs";
    document.getElementById("messageErreur").style.display = "flex";
  } else {
    button.disabled = true;

    const data = {
      password: password,
    };

    const response = await fetch("/auth/changePassword", {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {

      document.getElementById("loader").style.display = "none";
      response.json().then((data) => {
        document.getElementById("messageErreur").textContent =
          data.errorMessage;
      });
      document.getElementById("messageErreur").style.display = "flex";
      button.disabled = false;
    } else {
        
        button.disabled = false;
        response.json().then((data) => {
          document.getElementById("messageSuccess").textContent = data.message;
        });
        document.getElementById("messageSuccess").style.display = "flex";
  
        setTimeout(() => {
          document.getElementById("loader").style.display = "none";
          window.location.href = "/auth/login"
        }, 3000);
    }
  }
}
