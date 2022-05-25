
   var nump=/^(91)?[1-9]\d{9}$/g;
   var mailp=/^\w+@[a-z A-Z]+.(com|co|in)/g;
  function checkPassword(){
    let mail=document.querySelector('input[type="email"]');
    if(!(mail.value.match(mailp))){
        mail.style.border="2px solid red";
    }else{
        mail.style.border="";
        console.log(mail)
    }
   }