const getForm = document.querySelector(".form");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^s@]+.[^s@]+$/;
  return emailRegex.test(email);
}

getForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const getEmail = document.querySelector("#email").value.trim();
  const getMessage = document.querySelector("#textarea").value;
  const getFeedbackArea = document.querySelector("#feedback_area");

  function clearFeedback() {
    getFeedbackArea.innerHTML = "";
  }
  function showSucess() {
    getFeedbackArea.innerHTML = `<br><small style="color: green;">*Sua mensagem foi enviada com sucesso!</small>`;
    setTimeout(clearFeedback, 2000);
  }

  function showError(message) {
    getFeedbackArea.innerHTML = `<br><small style="color: red;">${message}</small>`;
    getForm.reset();
    setTimeout(clearFeedback, 3000);
  }

  if (getEmail === "" || getMessage === "") {
    showError("*Preencha todos os campos!");
    return;
  }

  if (!isValidEmail(getEmail)) {
    showError("Email inválido! Por favor, insira um email válido.");
    return;
  }

  const dataContact = {
    email: getEmail,
    message: getMessage,
    timestamp: new Date(),
  };

  localStorage.setItem(dataContact.email, JSON.stringify(dataContact));
  getForm.reset();
  showSucess();
});
