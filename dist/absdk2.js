var e,t=(e=require("axios"))&&"object"==typeof e&&"default"in e?e.default:e,r=require("ethers"),o=require("abridged");"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var a=function(){var e=this;this.init=function(){try{try{var t=localStorage.getItem("STORAGE_PRIVATE_KEY");e.sdk=o.createKovanSdk({authKeyModule:{privateKey:t},queryProviderEndpoint:"https://kovan.infura.io/v3/7acf175321ac4b3cba908ec2111dc297"}),t||e.sdk.exportPrivateKey().then(function(e){return localStorage.setItem("STORAGE_PRIVATE_KEY",e)}).catch(function(){return null})}catch(e){return console.log("error initilizing..",e),Promise.resolve(null)}return console.log("old account",e.state.accountAddress),Promise.resolve(e.sdk.createAccount(e.state.accountAddress)).then(function(t){console.log("new account",t),amount&&(e.state.accountAddress=t.address,e.state.externalDepositAddress=t.externalDepositAddress,e.state.balance=0)})}catch(e){return Promise.reject(e)}},this.sdk=null;var t=new URLSearchParams(location.search),r=(t.get("id"),t.get("url"),t.get("account"));this.state={accountAddress:r,authKey:"",externalDepositAddress:"",address:"",balance:0}};a.prototype.transfer=function(e){try{var t=this;t.listener();var o={recipient:e,value:r.ethers.utils.parseEther("0.1"),data:"0x"},a=function(e,r){try{var a=Promise.resolve(t.sdk.batchExecuteAccountTransaction(o)).then(function(){return Promise.resolve(t.sdk.estimateBatch()).then(function(){return Promise.resolve(t.sdk.submitBatch()).then(function(e){console.log(e)})})})}catch(e){return r(e)}return a&&a.then?a.then(void 0,r):a}(0,function(e){console.log(e)});return Promise.resolve(a&&a.then?a.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},a.prototype.listener=function(){this.sdk.state$.notification$.subscribe(function(e){console.log("subscribe"),null!==e&&(e.type!==o.NotificationTypes.RelayedTransactionUpdated||"Sending"!==e.payload.state||console.log("trx hash "+e.payload.hash))})};var n=require("global/window"),s=function(){try{var e=(void 0).state.server_url;return Promise.resolve(t.post(e+"/setauthkey/",{id:(void 0).state.recordId,client_auth_key:(void 0).state.auth_key})).then(function(e){alert(e.data),n.close()})}catch(e){return Promise.reject(e)}};function c(){var e=function(){s();var e=new URLSearchParams(this.props.location.search),t=e.get("id"),r=e.get("url");return console.log(t,r),{balance:0,recordId:t,server_url:r}}();e.auth_key=e.auth_key||null;try{var t,o=localStorage.getItem("STORAGE_PRIVATE_KEY");o?t=new r.ethers.Wallet(o):(t=r.ethers.Wallet.createRandom(),localStorage.setItem("STORAGE_PRIVATE_KEY",t.privateKey),localStorage.setItem("auth_storage_key",t.address),console.log(t.privateKey)),e.auth_key=t.address}catch(e){return console.log("error initilizing..",e),null}return e.auth_key}function i(){var e=c();return(new a).transfer(e)}n&&(n.webWallet=i);var l={init:c,wallet:wallet,run:i};module.exports=l;
//# sourceMappingURL=absdk2.js.map
