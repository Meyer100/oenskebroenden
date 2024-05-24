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

export const getHistoryWishlist = async (token) => {
    try {
       const result = await APIManager(`History/GetHistory`, {
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

export const getOneWishlist = async (token, id) => {
    try {
       const result = await APIManager(`Wish/GetOneWishList?wishListId=${id}`, {
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

export const addWishlistToHistory = async (token, id) => {
    try {
       const result = await APIManager(`History/AddHistory?wishListId=${id}`, {
           method: 'POST',
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

export const deleteWish = async (token, id) => {
    try {
       const result = await APIManager(`Wish/DeleteWish?wishId=${id}`, {
           method: 'DELETE',
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