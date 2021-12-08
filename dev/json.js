var metaData = new Object();
metaData.name = 'testName'
metaData.description = 'testDescription'
metaData.image = 'ipfs://'

var attributes1 = new Object();
attributes1.trait_type = 'BackGround'
attributes1.value = 'testBackGround'
var attributes2 = new Object();
attributes2.trait_type = 'Type'
attributes2.value = 'testType'

var array = new Array();
array.push(attributes1)
array.push(attributes2)

metaData.attributes = array

var jsonData = JSON.stringify(metaData)
console.log(jsonData)