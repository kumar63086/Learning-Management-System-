const { Webhook } = require('svix');
const { StatusCodes } = require('http-status-codes');
const User = require('../model/User');
const successResponse = require('../utils/common/success-response');
const errorResponse = require('../utils/common/error-response');
const catchAsync = require('../utils/catchAsync/catchAsync');

// Webhook handler for Clerk events
const clerkWebhooks = catchAsync(async (req, res) => {
  try {
    const wbhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await wbhook.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });

    const { data, type } = req.body;
    console.log(`✅ Clerk webhook received: ${type}`);

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        await User.create(userData);

        return res.status(StatusCodes.CREATED).json(
          successResponse({
            message: 'User created successfully',
            data: userData,
          })
        );
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        return res.status(StatusCodes.OK).json(
          successResponse({
            message: 'User updated successfully',
            data: userData,
          })
        );
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        return res.status(StatusCodes.OK).json(
          successResponse({
            message: 'User deleted successfully',
          })
        );
      }

      default:
        console.warn("⚠️ Unhandled Clerk webhook event type:", type);
        return res.status(StatusCodes.BAD_REQUEST).json(
          errorResponse({
            message: `Unhandled event type: ${type}`,
          })
        );
    }
  } catch (error) {
    console.error("❌ Clerk webhook error:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      errorResponse({
        message: 'Error processing webhook',
        error: error.message,
      })
    );
  }
});

module.exports = { clerkWebhooks }  ;
