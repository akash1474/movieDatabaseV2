import Axios from "axios";
import lottie from "lottie-web";

const animation = lottie.loadAnimation({
	container: document.querySelector(".animatedSvg")!, // the dom element that will contain the animation
	renderer: "svg",
	loop: false,
	autoplay: false,
	path: "check.json", // the path to the animation json
});
const loginPopUp = document.getElementById("popup__container")!;

export default function initiateLogin() {
	const form = document.getElementById("user__form")! as HTMLFormElement;
	form.addEventListener("submit", async (e) => {
		const spinner = `<svg id="add-spinner" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background:transparent;" width="22px" height="22px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<circle cx="50" cy="50" r="32" stroke-width="8" stroke="#fff" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
			  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.5847953216374269s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
			</circle>
			</svg>`;
		const loginSubmit = document.getElementById(
			"login__submit--btn"
		)! as HTMLButtonElement;
		try {
			e.preventDefault();
			loginSubmit.insertAdjacentHTML("afterbegin", spinner);
			const emailId = (document.getElementById(
				"user__email"
			)! as HTMLInputElement).value;
			const password = (document.getElementById(
				"user__pass"
			)! as HTMLInputElement).value;

			if (!emailId || !password) {
				alert("Please enter email and password");
			} else {
				const res = await Axios.post(
					"https://hardrive-database-1474.herokuapp.com/api/v1/users/login",
					{
						email: emailId,
						password: password,
					}
				);
				if (res.status === 200) {
					loginPopUp.style.display = "flex";
					animation.play();
					setInterval(() => {
						(document.querySelector(
							".login__screen"
						)! as HTMLDivElement).style.display = "none";
						location.reload();
						loginSubmit.innerHTML = "Login";
					}, 1500);
				}
			}
		} catch (err) {
			loginSubmit.innerHTML = "Login";
			form.reset();
			alert("Invalid Email or Password!!!");
		}
	});
}
