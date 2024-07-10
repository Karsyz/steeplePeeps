const email = document.querySelectorAll("#emailCopy");
const phoneNum = document.querySelectorAll("#phoneCopy");

email.forEach((el) => el.addEventListener("click", copyToClipboard));
phoneNum.forEach((el) => el.addEventListener("click", copyToClipboard));

async function copyToClipboard(evt) {
  const textToCopy = evt.target.dataset.datacopy;
  try {
    await navigator.clipboard.writeText(textToCopy);
    alert(`"${textToCopy}" copied to clipboard!`);
  } catch (error) {
    console.error("Failed to copy text: ", err);
  }
}
