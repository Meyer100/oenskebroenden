import APIManager from "./APIManager";

// Modtager brugerens jwt token og id på ønskelisten, sender en request GET request til api
// her får vi alle chatbeskeder tilbage fra en ønskeliste
export const getAllChatMessageFromOneWishlist = async (token, id) => {
    try {
       const result = await APIManager(`Chat/GetChat?wishListId=${id}`, {
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

export const saveSentMessage = async (token, data) => {
    try {
       const result = await APIManager(`Chat/AddMessage`, {
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
