import APIManager from "./APIManager";

export const createWishlist = async (data, token) => {
    try {
       const result = await APIManager("wish/createwishlist", {
           method: 'POST',
           headers: {
               'content-type':'application/json',
               'Authorization': `Bearer ${token}`
           },
           data: data
       });
       return result;
    }
    catch (error) {
       console.log(error)
    }
}


export const getOwnWishlists = async (token) => {
    try {
       const result = await APIManager(`wish/GetWishlists`, {
           method: 'GET',
           headers: {
               'content-type':'application/json',
               'Authorization': `Bearer ${token}`
           },
       });
       return result;
    }
    catch (error) {
       console.log(error)
    }
}

export const createWish = async (data, token) => {
    try {
       const result = await APIManager("wish/CreateWish", {
           method: 'POST',
           headers: {
               'content-type':'application/json',
               'Authorization': `Bearer ${token}`
           },
           data: data
       });
       return result;
    }
    catch (error) {
       console.log(error)
    }
}