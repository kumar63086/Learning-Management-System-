import { Webhook } from 'svix';
import User from '../model/User.js';
import dotenv from 'dotenv';
dotenv.config();
export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body; // raw buffer from bodyParser.raw
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    };

    // Log headers for debugging (optional)
    console.log("Webhook Headers:", headers);

    const evt = wh.verify(payload, headers);
    const { data, type } = evt;

    // ✅ Log the event type
    console.log(`🔔 Clerk Event Received: ${type}`);

    // ✅ Log the full payload
    console.log("📦 Event Payload:", JSON.stringify(data, null, 2));

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        console.log("✅ Creating User:", userData);
        await User.create(userData);

        return res.status(201).json({ message: 'User created successfully', data: userData });
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || '',
          name: `${data.first_name} ${data.last_name}`.trim(),
          imageUrl: data.image_url || '',
        };

        console.log("🔄 Updating User:", userData);
        await User.findByIdAndUpdate(data.id, userData);

        return res.status(200).json({ message: 'User updated successfully', data: userData });
      }

      case 'user.deleted': {
        console.log("🗑️ Deleting User ID:", data.id);
        await User.findByIdAndDelete(data.id);

        return res.status(200).json({ message: 'User deleted successfully' });
      }

      default:
        console.warn("⚠️ Unhandled Clerk event type:", type);
        return res.status(400).json({ message: 'Unhandled event type' });
    }
  } catch (error) {
    console.error('❌ Error handling Clerk webhook:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

