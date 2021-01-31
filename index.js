const Web3 = require('web3');

const awsGeth = "ws://ec2-13-250-42-164.ap-southeast-1.compute.amazonaws.com:8545"
const infura = "wss://mainnet.infura.io/ws/v3/3cdee1310ccc4e9fbb19bf8d9967358e"

const startBlock =11763000 ;
const exchangeOwner = "0x42bc1ab51b7af89cfaa88a7291ce55971d8cb83a"
const exchangeV3 = "0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4"

const oprator7 = "0xa921af7e4dd279e1325399e4e3bf13d0e57f48fc"
const eventBlockSubmitted = "0xcc86d9ed29ebae540f9d25a4976d4da36ea4161b854b8ecf18f491cf6b0feb5c"

let web3 = new Web3(Web3.givenProvider || infura);

// web3.eth.getBlock("latest").then(console.log);
// web3.eth.defaultBlock = startBlock;

var subscription = web3.eth.subscribe('logs', {
	fromBlock: startBlock,
    address: exchangeV3,
    topics: [eventBlockSubmitted]
}, function(error, event){
    if (error) {
    	console.error(error);
    	return;
    }


        web3.eth.getTransaction(event.transactionHash, function(error, tx) {
        	if (error) {
        		console.error(error);
        		return;
        	}
        	console.log(event.topics[1])
        	// console.log(tx)
        })

});