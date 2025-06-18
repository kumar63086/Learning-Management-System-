import { Webhook } from 'svix';
import User from '../model/User.js';
import dotenv from 'dotenv';
dotenv.config();
export const clerkWebhooks = async (req, res) => {
  try {
     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ Use raw Buffer (req.body) for svix verification
    const payload = req.body;
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    };

    // ✅ Verified and parsed event
    const evt = wh.verify(payload, headers);
    const { data, type } = evt;

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + "  " + data.last_name,
          imageUrl: data.image_url,
        };

        await User.create(userData);
        return res.status(201).json({
          message: 'User created successfully',
          data: userData,
        })
        
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          name: data.first_name + "  " + data.last_name,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({
          message: 'User updated successfully',
          data: userData,
        });

      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({
          message: 'User deleted successfully',
        });
    
      }

      default:
        return res.status(400).json({ message: 'Unhandled event type' });
    }
  } catch (error) {
    console.error('Error handling Clerk webhook:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
