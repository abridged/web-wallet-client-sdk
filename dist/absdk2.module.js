import e from"axios";import{ethers as t}from"ethers";import{NotificationTypes as r,createKovanSdk as o}from"abridged";"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var a=function(){var e=this;this.init=function(){try{try{var t=localStorage.getItem("STORAGE_PRIVATE_KEY");e.sdk=o({authKeyModule:{privateKey:t},queryProviderEndpoint:"https://kovan.infura.io/v3/7acf175321ac4b3cba908ec2111dc297"}),t||e.sdk.exportPrivateKey().then(function(e){return localStorage.setItem("STORAGE_PRIVATE_KEY",e)}).catch(function(){return null})}catch(e){return console.log("error initilizing..",e),Promise.resolve(null)}return console.log("old account",e.state.accountAddress),Promise.resolve(e.sdk.createAccount(e.state.accountAddress)).then(function(t){console.log("new account",t),amount&&(e.state.accountAddress=t.address,e.state.externalDepositAddress=t.externalDepositAddress,e.state.balance=0,e.state.description="Sign trx to trf 0.01 eth to address below")})}catch(e){return Promise.reject(e)}},this.sdk=null;var t=new URLSearchParams(location.search),r=(t.get("id"),t.get("url"),t.get("account"));this.state={accountAddress:r,authKey:"",externalDepositAddress:"",address:"",balance:0,description:"Please wait..."}};a.prototype.transfer=function(e){try{var r=this;r.listener();var o={recipient:e,value:t.utils.parseEther("0.1"),data:"0x"},a=function(e,t){try{var a=Promise.resolve(r.sdk.batchExecuteAccountTransaction(o)).then(function(){return Promise.resolve(r.sdk.estimateBatch()).then(function(){return Promise.resolve(r.sdk.submitBatch()).then(function(e){console.log(e)})})})}catch(e){return t(e)}return a&&a.then?a.then(void 0,t):a}(0,function(e){console.log(e)});return Promise.resolve(a&&a.then?a.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},a.prototype.listener=function(){this.sdk.state$.notification$.subscribe(function(e){console.log("subscribe"),null!==e&&(e.type!==r.RelayedTransactionUpdated||"Sending"!==e.payload.state||console.log("trx hash "+e.payload.hash))})};export default{init:function(){var r=function(){!function(){try{var t=(void 0).state.server_url;Promise.resolve(e.post(t+"/setauthkey/",{id:(void 0).state.recordId,client_auth_key:(void 0).state.auth_key})).then(function(e){alert(e.data),window.close()})}catch(e){return Promise.reject(e)}}();var t=new URLSearchParams(this.props.location.search),r=t.get("id"),o=t.get("url");return console.log(r,o),{balance:0,recordId:r,text:"Please wait...",server_url:o}}();try{var o,a=localStorage.getItem("STORAGE_PRIVATE_KEY");return a?o=new t.Wallet(a):(o=t.Wallet.createRandom(),localStorage.setItem("STORAGE_PRIVATE_KEY",o.privateKey),localStorage.setItem("auth_storage_key",o.address),console.log(o.privateKey)),void(r.auth_key=o.address)}catch(e){return console.log("error initilizing..",e),null}},wallet:a};
//# sourceMappingURL=absdk2.module.js.map
