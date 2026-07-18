     const pass = document.getElementById("password");
            const cnfpass = document.getElementById("confirmpassword");
            const button = document.getElementById("button");
            function mismatch() {
                if(pass.value!=cnfpass.value){
                    button.disabled = true;
                    button.textContent = "password mismatch"
                }
                else{
                    button.disabled = false;
                    button.textContent = "ADD";
                }
            }
            pass.addEventListener("input",mismatch)
            cnfpass.addEventListener("input",mismatch)