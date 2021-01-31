const Web3 = require('web3');


const awsGeth = "ws://ec2-13-250-42-164.ap-southeast-1.compute.amazonaws.com:8545"
const infura = "wss://mainnet.infura.io/ws/v3/3cdee1310ccc4e9fbb19bf8d9967358e"

const startBlock =11763791 ;
const exchangeOwner = "0x42bc1ab51b7af89cfaa88a7291ce55971d8cb83a"
const exchangeV3 = "0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4"

const oprator7 = "0xa921af7e4dd279e1325399e4e3bf13d0e57f48fc"
const eventBlockSubmitted = "0xcc86d9ed29ebae540f9d25a4976d4da36ea4161b854b8ecf18f491cf6b0feb5c"

let web3 = new Web3(Web3.givenProvider || infura);
const BN = web3.utils.BN;

// web3.eth.getBlock("latest").then(console.log);
// web3.eth.defaultBlock = startBlock;

var subscription = web3.eth.subscribe('logs', {
	fromBlock: startBlock,
    address: exchangeV3,
    topics: [eventBlockSubmitted]
}, function(error, event){
		web3.eth.getBlock(event.blockNumber, function(error, blk) {
        web3.eth.getTransaction(event.transactionHash, function(error, tx) {


        	const block = {...event, ...tx }

        	block.dexBlockIndex = parseInt(new BN(block.topics[1].substring(2)).toString());
        	block.dexMerkelRoot = block.data.substring(0, 64+2);
        	block.dexPublicDataHash = "0x"+block.data.substring(66);
        	block.timestamp = blk.timestamp;

        	delete block.hash;
        	delete block.data;
        	delete block.topics;
        	delete block.id;
        	delete block.nonce;
        	delete block.value;
        	delete block.r;
        	delete block.s;
        	delete block.v;
        	delete block.removed;
        	delete block.logIndex;
        	delete block.transactionIndex;
        	delete block.address;
        	delete block.to;
        	delete block.from;

        	console.log(block)
        	console.log('--------------------')
        })
    });

});