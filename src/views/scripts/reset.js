async function submitresetform(event) {
  event.preventDefault();
  console.log("In submitresetform");

  document.getElementById("loader").style.display = "flex";
  document.getElementById("messageErreur").style.display = "none";
  document.getElementById("messageSuccess").style.display = "none";
  const button = document.getElementById("resetbutton");

  button.disabled = true;

  var email = document.getElementById("email").value;
  var code = document.getElementById("code").value;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (document.getElementById("divCode").style.display === "none") {
    const data = {
      email: email,
    };

    const response = await fetch("/auth/resetPass/sendCode", {
      method: "POST",
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
      document.getElementById("email").readOnly = true;
      document.getElementById("loader").style.display = "none";
      document.getElementById("divCode").style.display = "";
      button.disabled = false;
      response.json().then((data) => {
        document.getElementById("messageSuccess").textContent = data.message;
      });
      document.getElementById("messageSuccess").style.display = "flex";
    }
  } else if (
    document.getElementById("divCode").style.display !== "none" &&
    code
  ) {
    const data = {
      email: email,
      code: code,
    };

    const response = await fetch("/auth/resetPass/verifyCode", {
      method: "POST",
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

      setTimeout(async () => {
        document.getElementById("loader").style.display = "none";
        window.location.href = '/auth/changePassword';
      }, 5000);
    }
  }
}
