const allUsers = document.querySelectorAll("#allUsers>li");
const memberFilterInput = document.getElementById("memberFilter");

memberFilterInput.addEventListener("input", filterMembers);

// add hidden class to li that doesn't contain the input string
function filterMembers(evt) {
  allUsers.forEach((user) => {
    if (!user.dataset.name.toLowerCase().includes(evt.target.value.toLowerCase())) {
      user.classList.add("hidden");
    } else {
      user.classList.remove("hidden");
    }
  });
}
