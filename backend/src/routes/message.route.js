import express from 'express';

import { getAllContacts,getMessagesById,sendMessage ,getchatPartners} from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';
const router=express.Router();


router.use(protectRoute);
router.use(arcjetProtection,protectRoute);


router.get('/contacts',getAllContacts);
router.post('/send/:id',sendMessage);

router.get('/chats',getchatPartners);

router.get('/:id',getMessagesById);

export default router;