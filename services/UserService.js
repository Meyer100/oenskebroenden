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