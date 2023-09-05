import express from 'express';
import Notifications from '../../db/schema_notification'; 
import StudentDetails from '../../db/schema_studentDetails';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
 
const router = express.Router();

// Get notifications data from database
router.get('/notifications', async(req, res) => {
    const notificationsList = await Notifications.find();    
//   console.log("backend-notifications");
//   console.log(notificationsList);
    // Then send it as JSON like so:
    res.json(notificationsList);
});

// Update notifications status
router.put('/notifications', async (req, res) => {
    const notificationsList = await Notifications.find({'status':false});  
    console.log("result!:",notificationsList);

    for (let i=0;i<notificationsList.length;i++) {
        notificationsList[i].status = !notificationsList[i].status;
        await notificationsList[i].save();
    } 
});

// Get studentDetailsJson data from database
router.get('/studentDetailsJson', async(req, res) => {
    const studentDetailsList = await StudentDetails.find();    
  
    // Then send it as JSON like so:
    res.json(studentDetailsList);
});
 
 export default router;