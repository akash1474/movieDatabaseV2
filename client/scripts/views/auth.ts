import Axios from 'axios';
import lottie from 'lottie-web';

const animation=lottie.loadAnimation({
    container: document.querySelector('.animatedSvg')!, // the dom element that will contain the animation
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'check.json', // the path to the animation json
});
const loginPopUp=document.getElementById('popup__container')!;

export default function initiateLogin(){
			const form=document.getElementById('user__form')!as HTMLFormElement;
			form.addEventListener('submit',async(e)=>{

		    try{
			    e.preventDefault();
			    const emailId=(document.getElementById("user__email")! as HTMLInputElement).value;
			    const password=(document.getElementById("user__pass")! as HTMLInputElement).value;


			    if(!emailId || !password){
			       alert("Please enter email and password");
			    }else{
				    const res=await Axios.post('https://hardrive-database-1474.herokuapp.com/api/v1/users/login',{
				    		email:emailId,
				    		password:password
				    	});
				    
				   if(res.status===200){
					   loginPopUp.style.display="flex";
					   animation.play();
					   setInterval(()=>{
						   	(document.querySelector('.login__screen')! as HTMLDivElement).style.display="none";
						   location.reload();
						},1500);	
				   }
			    }
		}catch(err){
				form.reset();
				alert("Invalid Email or Password!!!");
		}
	});
}