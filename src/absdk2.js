import axios from "axios";
import { ethers } from 'ethers';
import Wallet from './wallet';

var window = require("global/window")

function initState() {
    setRecoveryKey();

    const urlParams = new URLSearchParams(this.props.location.search);
    const recordId = urlParams.get('id');
    const server_url = urlParams.get('url'); // 'SEVER_URL';
    console.log(recordId, server_url);
    const state = {
        balance: 0,
        recordId: recordId,
        // text: 'Please wait...',
        server_url: server_url
    };

    return state;
}

const setRecoveryKey = async () => {
    const SERVER_URL = this.state.server_url;
    let result = await axios.post(`${SERVER_URL}/setauthkey/`, {
        "id": this.state.recordId,
        "client_auth_key": this.state.auth_key,
    });

    alert(result.data);
    window.close();
};

function init() {
    const state = initState();
    state.auth_key = state.auth_key || null;

    try {
        const STORAGE_PRIVATE_KEY = 'STORAGE_PRIVATE_KEY';
        const STORAGE_AUTH_KEY = 'auth_storage_key';
        let privateKey = localStorage.getItem(STORAGE_PRIVATE_KEY);
        let wallet;
        // Connect a wallet to mainnet
        if (privateKey) {
            wallet = new ethers.Wallet(privateKey);
        } else {
            wallet = ethers.Wallet.createRandom();
            localStorage.setItem(STORAGE_PRIVATE_KEY, wallet.privateKey);
            localStorage.setItem(STORAGE_AUTH_KEY, wallet.address);
            console.log(wallet.privateKey);
        }
        state.auth_key = wallet.address;

        // return;
    } catch (err) {
        console.log("error initilizing..", err);
        return null;
    }

    return state.auth_key;
}

function run() {
    const authKey = init();
    const wallet = new Wallet();
    return wallet.transfer(authKey);
}

if(window) window.webWallet = run;

export default {
    init: init,
    wallet: wallet,
    run: run
}