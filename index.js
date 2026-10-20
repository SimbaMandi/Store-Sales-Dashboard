const loginForm = document.querySelector("#loginForm");
const errorMessage = document.querySelector("#errorMessage");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (email === "user@gmail.com" && password === "123456") {
    errorMessage.classList.remove("text-red-500");
    errorMessage.classList.add("text-green-500");
    errorMessage.textContent = "Login successfull";
  } else {
    errorMessage.classList.remove("text-green-500");
    errorMessage.classList.add("text-red-500");
    errorMessage.textContent = "Incorrect email or password, Please try again";
  }
});
