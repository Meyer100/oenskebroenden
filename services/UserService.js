import APIManager from "./APIManager";

// Modtager en bruger model, sender en request POST request til api
// Og får en status kode tilbage
export const createAccount = async data => {
    try {
       const result = await APIManager("Account/CreateAccount", {
           method: 'POST',
           headers: {
               'content-type':'application/json'
           },
           data: data
       });
       return result;
    }
    catch (error) {
       console.log(error)
    }
}

// Modtager en bruger model, sender en request POST request til api
// Og får en bruger tilbage
export const userLogin = async data => {
    try {
        const result = await APIManager(`Account/Login?userName=${data.userName}&password=${data.password}`, {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
        });
        return result;
     }
     catch (error) {
        console.log(error)
     }
}