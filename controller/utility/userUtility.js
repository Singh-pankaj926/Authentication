const user = require('../../models/userModel');
const errorConstants = require("../../constants/errorConstants");
const bcrypt = require('bcrypt');
const notErrorConstants = require('../../constants/notErrorConstants');
const { generateToken } = require("../../connection/jsonWebToken");

async function checkForExisitingUser(emailID){
    console.log("-------------------- Inside userUtility checkForExisitingUser Method -------------------");
    try{
        const userExist = await user.findOne({email: emailID});
        if(userExist){
            return Promise.reject(errorConstants.userAlreadyExistsError());
        }
        return 0;
    }
    catch(err){
        console.log('Error in userUtility checkForExisitingUser method\n'+err);
        return Promise.reject(err);
    }
};

async function saveNewUser (userDetails){
    console.log("-------------------- Inside userUtility saveNewUser Method -------------------");
    try{
        // hashing password before saving into database
        // userDetails.password = await bcrypt.hash(userDetails.password, 12);
        const hashedPassword = await bcrypt.hash(userDetails.password, 12);
        userDetails.password = hashedPassword;
        const userInserted = await user.create(userDetails);
        if(userInserted){
            console.log("User Registered Successfully as: "+ userInserted)
            return userInserted;
        }else{
            return Promise.reject(userInserted);
        }
    }
    catch(err){
        console.log('Error in userUtility saveNewUser method\n'+err);
        return Promise.reject(err);
    }
};

async function verifyLoginCredentials(loginCredentials){
    console.log("-------------- Inside userUtility verifyLoginCredentials Method -------------------")
    try{
        // search user on the email field
        // const userFound = await user.findOne({email: loginCredentials.email});

        // if(!userFound){
        //     return Promise.reject(notErrorConstants.userNotRegistered());
        // }

        const userFound = await getUser(loginCredentials, 0);

        // Now we will check whether password provided by user is correct or not
        const result = await bcrypt.compare(loginCredentials.password, userFound.password);

        if(!result){
            return Promise.reject(notErrorConstants.invalidLoginCredentails());
        }

        return userFound;
    }
    catch(err){
        console.log('Error in userUtility verifyLoginCredentials method\n'+err);
        return Promise.reject(err);
    }
};

async function getUserList(){
    console.log("-------------- Inside userUtility getUserList Method -------------------")
    try{
        const allUserList = await user.find({}, 'name email mobile');

        if(!allUserList){
            return Promise.reject(allUserList);
        }

        return allUserList;
    }
    catch(err){
        console.log('Error in userUtility getUserList method\n'+err);
        return Promise.reject(err);
    }
};

// operation can be search = 1 | update = 2 | delete = 3 | login = default 
async function getUser(userDetails, operation = 1){
    console.log("-------------- Inside userUtility getUser Method -------------------")
    try{
        const userDetail = await user.findOne({email: userDetails.email});

        if(!userDetail){            
            switch(operation){
                case 1: return Promise.reject(`${userDetails.email} doesn't exists!!!`);
                    break;
                case 3: return  Promise.reject(`Cannot Update ${userDetails.email}, As User Is Not Registered With Us.`);
                    break;
                case 4: return Promise.reject(`Cannot Delete ${userDetails.email}, As User Is Not Registered With Us.`);
                    break;
                default: return Promise.reject(`Invalid Login Credentails!!! ${userDetails.email} doesn't exists!!!`);                    
            }
        }

        // if(!userDetail){
        //     // return Promise.reject(userDetail);
        //     return Promise.reject(`${userDetails.email} doesn't exists!!!`);
        // }

        return userDetail;
    }
    catch(err){
        console.log('Error in userUtility getUser method\n'+err);
        return Promise.reject(err);
    }
};

async function deleteUserInfo(userDetails){
    console.log("-------------- Inside userUtility deleteUserInfo Method -------------------")
    try{
        // using findOneAndDelete bcoz after deleteing it give us document which is delete and deleteOne only give us acknowledgement
        // const removedUserDetails = await user.deleteOne({email: userDetails.email});
        const removedUserDetails = await user.findOneAndDelete({email: userDetails.email});

        if(!removedUserDetails){
            return Promise.reject(`Error In Deleting User!!! Please Try Again After Sometime.`);
        }
        return removedUserDetails;
    }
    catch(err){
        console.log('Error in userUtility deleteUserInfo method\n'+err);
        return Promise.reject(err);
    }
};

function prepareResponse(userDetails){
    console.log("------------- Inside userUtility prepareResponse Method -------------------")
    try{
        const responseObject = {};

        responseObject.email = userDetails.email;
        responseObject.name = userDetails.name;
        responseObject.mobile = userDetails.mobile;

        return responseObject;
    }
    catch(err){
        console.log('Error in userUtility prepareResponse method\n'+err);
        return Promise.reject(err);
    }
}

function generateTokenForUser(userInfo){
    console.log("------------- Inside userUtility generateTokenForUser Method -------------------")
    try{
        const responseObject = prepareResponse(userInfo);
        const token = `Bearer ${generateToken(responseObject)}`;

        // adding token to the response
        responseObject.token = token
        
        return responseObject
    }
    catch(err){
        console.log('Error in userUtility generateTokenForUser method\n'+err);
        return Promise.reject(err);
    }
}

module.exports = { checkForExisitingUser, saveNewUser, verifyLoginCredentials, getUserList, getUser, deleteUserInfo, prepareResponse, generateTokenForUser }