import { client } from "../config/upstash.js";
import Subscription from "../models/Subscription.js";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionCreated } from "../utils/emailTemplates.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // SEND CREATION EMAIL
    await sendEmail({
      to: req.user.email, // make sure req.user has the email
      subject: `Subscription Activated: ${subscription.name}`,
      html: subscriptionCreated({
        userName: req.user.name,
        name: subscription.name,
        price: subscription.price,
        renewalDate: subscription.renewalDate,
      }),
    });

    const workflowRun = await client.trigger({
      url: "http://localhost:5000/api/workflows/subscription/reminder",
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });
    res
      .status(201)
      .json({ success: true, data: subscription, workflow: workflowRun });
  } catch (e) {
    next(e);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    subscription.name = req.body.name || subscription.name;
    subscription.price = req.body.price || subscription.price;
    subscription.currency = req.body.currency || subscription.currency;
    subscription.frequency = req.body.frequency || subscription.frequency;
    subscription.paymentMethod =
      req.body.paymentMethod || subscription.paymentMethod;
    subscription.startDate = req.body.startDate || subscription.startDated;

    await subscription.save();

    return res.status(200).json({
      success: true,
      message: "Subscription update successiful",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }
    if (subscription.status === "cancelled") {
      const error = new Error("Subscription already cancelled");
      error.statusCode = 400;
      throw error;
    }

    subscription.status = "cancelled";
    await subscription.save();
    return res
      .status(200)
      .json({ success: true, message: "Subscription cancelled !" });
  } catch (error) {
    next(error);
  }
};
