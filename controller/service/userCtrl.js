const { checkForExisitingUser, saveNewUser, verifyLoginCredentials, getUserList, getUser, deleteUserInfo, prepareResponse, generateTokenForUser } = require('../utility/userUtility');
const notErrorConstants = require("../../constants/notErrorConstants");

async function registerNewUser(req, res){
    console.log("-------------------- Inside userCtrl registerNewUser Method -------------------");
    try{
        // check whether user already exist or not
        await checkForExisitingUser(req.body.email);

        // if user does not exist, register it in database
        const savedDetails = await saveNewUser(req.body);

        const responseObj = prepareResponse(savedDetails);

        res.status(201).send({
            success: true,
            msg: notErrorConstants.userRegisteredSuccessfully(),
            data:  responseObj
        });
    }
    catch(err){
        console.error('Error in userCtrl registerNewUser method\n'+err);
        return res.status(400).send({
            success: false,
            msg: err,
        });
    }
};

async function userLoginVerification(req,res){
    console.log("-------------------- Inside userCtrl userLoginVerification Method -------------------");
    try{
        // verify credentials
        const userDetails = await verifyLoginCredentials(req.body);

        const responseObj = generateTokenForUser(userDetails);
        
        res.status(200).send({
            success: true,
            msg: notErrorConstants.userLoginSuccessfully(),
            data: responseObj
        });
    }
    catch(err){
        console.error('Error in userCtrl userLoginVerification method\n'+err);
        return res.status(400).send({
            success: false,
            msg: err,
        });
    }
};

async function getAllUser(req, res){
    console.log("----------- Inside userCtrl getAllUser Method -----------------");
    try{
        // const userList = await user.find();
        const userList = await getUserList();

        res.status(200).send({
            success: true,
            msg: notErrorConstants.userList(),
            data: userList
        });
    }
    catch(err){
        console.error('Error in userCtrl getAllUser method\n'+err);
        return res.status(400).send({
            success: false,
            msg: err,
        });
    }
};

async function getSingleUser(req, res){
    console.log("----------- Inside userCtrl getSingleUser Method -----------------");
    try{
        const userDetails = await getUser(req.query, 1);

        const responseObj = prepareResponse(userDetails);

        res.status(200).send({
            success: true,
            msg: notErrorConstants.userDetail(),
            data: responseObj
        });
    }
    catch(err){
        console.error('Error in userCtrl getSingleUser method\n'+err);
        return res.status(400).send({
            success: false,
            msg: err,
        });
    }
};

async function updateUser(req, res){
    console.log("----------- Inside userCtrl updateUser Method -----------------");
    try{
        
    }
    catch(err){
        console.error('Error in userCtrl updateUser method\n'+err);
        return res.status(400).send({
            success: false,
            msg: err,
        });
    }
};

async function deleteUser(req, res){
    console.log("----------- Inside userCtrl deleteUser Method -----------------");
    try{
        // before removing check whether user exists or not
        await getUser(req.query, 3);

        const deletedUserDetails = await deleteUserInfo(req.query);

        const responseObj = prepareResponse(deletedUserDetails);

        res.status(200).send({
            success: true,
            msg: notErrorConstants.userRemoved(),
            data: responseObj
        });
    }
    catch(err){
        console.error('Error in userCtrl deleteUser method\n'+err);
        return res.status(400).send({
            success: false,
            msg: err,
        });
    }
};

module.exports = { registerNewUser, userLoginVerification, getAllUser, getSingleUser, updateUser, deleteUser }