import APIManager from "./APIManager";

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