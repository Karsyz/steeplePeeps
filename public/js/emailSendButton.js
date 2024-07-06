const emailSendButtons = document.querySelectorAll("#sendEmailbutton");

emailSendButtons.forEach((button) =>
  button.addEventListener("click", sendLoginEmail)
);

// this utility will handle hitting the backend asyncly instead of directly so that the page doesn't reload
// instead of the form submitting directly I need to have the form trigger with a click event

async function sendLoginEmail(evt) {
  // icon paper plane to rotate right
  const clist = evt.target.classList;
  clist.remove("fa-paper-plane");
  clist.add("fa-rotate-right");
  clist.add("text-yellow-500");
  clist.add("animate-spin");

  // send email
  const url = "/emailLogin";
  const formData = new FormData();

  let email = evt.target.parentElement.dataset.email;

  if (email) {
    formData.append("email", email);
  } else {
    console.error("no email address");
    return;
  }

  const payload = new URLSearchParams(formData);

  try {
    const res = await fetch(url, { method: "POST", body: payload });

    if (res.ok) {
      // icon paper rotate right to green checkmark
      clist.remove("fa-rotate-right");
      clist.remove("animate-spin");
      clist.remove("text-yellow-500");
      clist.add("fa-check");
      clist.add("text-green-500");
    } else {
      // icon paper rotate right to red x
      clist.remove("fa-rotate-right");
      clist.remove("animate-spin");
      clist.remove("text-yellow-500");
      clist.add("fa-xmark");
      clist.add("text-red-500");
    }

    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
