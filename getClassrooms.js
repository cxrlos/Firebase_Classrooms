/*---------------------------------------------- getClassrooms.js ---------
    |
    |   Purpose: Simple function to get the 
    |
    |   Developer:  
    |       Alejandra Nissan - https://github.com/AlejandraNissan
    |       Carla Perez - https://github.com/CarlaPerezGavilan
    |       Carlos Garcia - https://github.com/cxrlos
    |
    *--------------------------------------------------------------------*/

'use strict'                                                                    
const AWS = require('aws-sdk'); 
AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    console.log(event.c_id);
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});
    const params = {
        TableName: "classrooms",
        Key: {
            classroom_id: event.c_id
        }
    }
    try{
        const data = await documentClient.get(params).promise();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
