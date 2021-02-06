const PaymentGateway = artifacts.require('PaymentGateway')
const CreateGateway = artifacts.require('CreateGateway')

module.exports = async function(deployer, network, accounts) {
  
  // Deploy PaymentGateWay
  await deployer.deploy(PaymentGateway, "0xDDDfECA42948ac67E4b2e9D3Fa0243d0516401e8" ,
   "0xDDDfECA42948ac67E4b2e9D3Fa0243d0516401e8")
  await deployer.deploy(CreateGateway)

//  const instance = await CreateGateway.deployed()
//  instance.createPaymentGate(accounts[1],accounts[1],{from: accounts[0]}).then(function(result) {
//    console.log("address of contract is :", result.logs[0].args.contractAddress);  
//  });
}
