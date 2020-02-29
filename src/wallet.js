import { ethers } from 'ethers';
import { NotificationTypes, createKovanSdk } from 'abridged';

class Wallet {
    constructor() {
        this.sdk = null;
        const urlParams = new URLSearchParams(location.search);
        const recordId = urlParams.get('id');
        const server_url = urlParams.get('url'); // 'URL'; // 
        const accountAddress = urlParams.get('account');

        this.state = {
            accountAddress: accountAddress,
            authKey: "",
            externalDepositAddress: "",
            address: "",
            balance: 0
            // description: 'Please wait...'
        };
    }

    init = async () => {
        try {
            const REACT_APP_INFURA_PROJECT_ID = "7acf175321ac4b3cba908ec2111dc297";
            const STORAGE_PRIVATE_KEY_NAME = 'STORAGE_PRIVATE_KEY';
            const privateKey = localStorage.getItem(STORAGE_PRIVATE_KEY_NAME);
            this.sdk = createKovanSdk({
                authKeyModule: {
                    privateKey
                },
                queryProviderEndpoint: REACT_APP_INFURA_PROJECT_ID
                    ? `https://kovan.infura.io/v3/${REACT_APP_INFURA_PROJECT_ID}`
                    : 'https://kovan.infura.io',
            });
            if (!privateKey) {
                this.sdk
                    .exportPrivateKey()
                    .then(privateKey => localStorage.setItem(STORAGE_PRIVATE_KEY_NAME, privateKey))
                    .catch(() => null);
            }
        } catch (err) {
            console.log("error initilizing..", err);
            return null;
        }

        // =======

        console.log('old account', this.state.accountAddress);
        let account = await this.sdk.createAccount(this.state.accountAddress);
        console.log('new account', account);
        if (!amount) {
            return;
        }

        // diff
        // Sign trx to trf 0.01 eth to address below
        this.state.accountAddress = account.address;
        this.state.externalDepositAddress = account.externalDepositAddress;
        this.state.balance = 0;
    }

    // Public interface
    async transfer(address) {
        this.listener();
        const options = {
            recipient: address,
            value: ethers.utils.parseEther('0.1'),
            data: '0x',
        };
        try {
            await this.sdk.batchExecuteAccountTransaction(options)
            await this.sdk.estimateBatch();
            let result = await this.sdk.submitBatch();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    listener() {

        // const resultPromise = new Promise((resolve, reject) => {
        this.sdk
            .state$
            .notification$
            .subscribe(notification => {
                console.log("subscribe")
                if (notification === null) {
                    return;
                }
                if (notification.type === NotificationTypes.RelayedTransactionUpdated && notification.payload.state === 'Sending') {
                    console.log('trx hash ' + notification.payload.hash);
                    // subscribtion.unsubscribe();
                    return;
                }
            });
        // })
    }
}

export default Wallet;
