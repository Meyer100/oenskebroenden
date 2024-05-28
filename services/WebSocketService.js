import { HubConnectionBuilder } from "@microsoft/signalr";

export const connection = new HubConnectionBuilder()
.withUrl('https://935e-37-75-161-47.ngrok-free.app/chathub')
.build();

export const joinLobby = (lobbyId) => {
    return new Promise((resolve, reject) => {
        connection.start().then(() => {
            connection.invoke('JoinLobby', lobbyId.toString()).then(() => {
                resolve(true);
            }).catch(() => {
                reject(false);
            });
        }).catch(() => {
            reject(false);
        })
    });
}

export const sendMessageToLobby = async (data) => {
    try {
        connection.invoke('SendMessage', data);
    }
    catch(error) {

    }
}