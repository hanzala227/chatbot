var prompt = document.getElementById("prompt");
var sendbtn = document.getElementById("sendbtn");
var chatCont = document.querySelector(".chat-area");

var api_url ="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBvG6oxmLJSjM71Nb1kRFIPP278CWbQuaI"

let user={
data:null
}


async function generateresponse(aichatbox) {

   let text = aichatbox.querySelector(".ai-chat-area");

    let requestoptions ={
        method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": user.data
                    }
                ]
            }
        ]
})
};

try {
    let response = await fetch(api_url, requestoptions);
    let data = await response.json();
    console.log(data);
text.innerHTML = data.candidates[0].content.parts[0].text;

} catch (error) {
console.log("Error fetching data:", error);
}


 

}

function createchatbox(html, classes) {
    let div = document.createElement("div"); 
div.innerHTML = html;
    div.classList.add(classes);
return div;
   }



function handleChatrespose(message){
    user.data = message;
let html =`

            <div class="user-chat-area">
                    ${message}
            </div>`

    let userchatbox = createchatbox(html,"user-chat-box");
    chatCont.appendChild(userchatbox);
    setTimeout(() => {
        let html =`
            <div class="ai-chat-area">
                       <img src="https://cdn.pixabay.com/animation/2024/04/02/07/57/07-57-40-974_512.gif" alt="" class="load">

            </div>`
                let aichatbox = createchatbox(html,"ai-chat-box");
        chatCont.appendChild(aichatbox);
        generateresponse(aichatbox)
    }, 1000);
}


prompt.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleChatrespose(prompt.value);
       
        prompt.value = ""; 
    }
});
sendbtn.addEventListener('click',()=>{
  if(prompt.value==''){
alert("Please enter a message");
  }
  else
      handleChatrespose(prompt.value);
       
        prompt.value = ""; 
})