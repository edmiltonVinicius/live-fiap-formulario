window.onload = function() {
  const form = document.getElementById("form");

  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const passwordConfirmation = document.getElementById("password-confirmation");
  const buttonSubmit = document.getElementById("button-submit");
  const buttonText = document.querySelector(".button-text");
  const spinner = document.querySelector(".spinner");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
  });

  function checkInputs() {
    buttonSubmit.disabled = true;
    spinner.classList.remove("hidden");
    buttonText.classList.add("hidden");

    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    if (usernameValue === "") {
      setErrorFor(username, "O nome de usuário é obrigatório.");
    } else {
      setSuccessFor(username);
    }

    if (emailValue === "") {
      setErrorFor(email, "O email é obrigatório.");
    } else if (!checkEmail(emailValue)) {
      setErrorFor(email, "Por favor, insira um email válido.");
    } else {
      setSuccessFor(email);
    }

    if (passwordValue === "") {
      setErrorFor(password, "A senha é obrigatória.");
    } else if (passwordValue.length < 7) {
      setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.");
    } else {
      setSuccessFor(password);
    }

    if (passwordConfirmationValue === "") {
      setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória.");
    } else if (passwordConfirmationValue !== passwordValue) {
      setErrorFor(passwordConfirmation, "As senhas não conferem.");
    } else {
      setSuccessFor(passwordConfirmation);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
      return formControl.className === "form-control success";
    });

    if (!formIsValid) {
      resetButtonSubmit();
      return
    } 

    toggleDisableInputs(true);
    
    setTimeout(() => {
      resetForm();
      resetButtonSubmit();
      toggleDisableInputs(false);
    }, 4000);
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const span = formControl.querySelector("span");

    // Adiciona a mensagem de erro
    span.innerText = message;

    // Adiciona a classe de erro
    formControl.className = "form-control error";
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;

    // Adicionar a classe de sucesso
    formControl.className = "form-control success";
  }

  function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  function resetForm() {
    form.reset();

    const formControls = form.querySelectorAll(".form-control");
    formControls.forEach((formControl) => {
      formControl.className = "form-control";
    });
  }

  function resetButtonSubmit() {
    buttonSubmit.disabled = false;
    spinner.classList.add("hidden");
    buttonText.classList.remove("hidden");
  }

  function toggleDisableInputs(shouldDisable){
    document.querySelectorAll('input').forEach(item => {
      item.disabled = shouldDisable
    })
  }
}


