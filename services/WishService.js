import APIManager from "./APIManager";

// Modtager en ønskeliste og brugeren jwt token, sender en request POST request til api
// Og får en status kode tilbage
// Her vil det have været en ide at api'en sendte den nyoprettet ønskeliste tilbage
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

// Modtager brugerens jwt token, sender en request GET request til api
// her får vi alle ens egen ønskelister tilbage
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
    }
}

// Modtager brugerens jwt token, sender en request GET request til api
// her får vi alle ønskelister som brugeren har fået delt/i historikken tilbage
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

// Modtager et ønske og brugerens jwt token, sender en request POST request til api
// Og får en status kode tilbage
// Her vil det have været en ide at api'en sendte den nyoprettet ønske tilbage
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

// Modtager brugerens jwt token og id'et på den ønsket ønskeliste, sender en request GET request til api
// her får vi en delt ønskeliste tilbage
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

// Modtager en brugerens jwt token og id'et på den ønsket ønskeliste, sender en request POST request til api
// Og får en status kode tilbage
// Her vil det have været en ide at api'en sendte den nyoprettet delt ønskeliste tilbage
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


// Modtager brugerens jwt token og et id til ønsket ønske, sender en request DELETE request til api
// her får vi en status kode tilbage om sletning skete korrekt
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

// Modtager brugerens jwt token og et id til ønsket ønskeliste, sender en request DELETE request til api
// her får vi en status kode tilbage om sletning skete korrekt
export const deleteWishlist = async (token, id) => {
    try {
       const result = await APIManager(`Wish/DeleteWishlist?wishlistId=${id}`, {
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

// Modtager id'et på den ønsket og brugerens jwt token, sender en request PUT request til api ?? dette burde være en POST
// Og får en status kode tilbage
export const reserveWish = async (wishId, token) => {
    try {
       const result = await APIManager(`Wish/ReserveWish?wishId=${wishId}`, {
           method: 'PUT',
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

// Modtager brugerens jwt token og url til den ønsket web scraping side, sender en request PUT request til api ?? dette burde være en POST
// Og får en status kode tilbage
export const scrapeWishFromWeb = async (token, url) => {
    try {
       const result = await APIManager(`Wish/GetWishFromWeb?url=${url}`, {
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