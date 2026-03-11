import dayjs from "dayjs";
import { serve } from "@upstash/workflow/express";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminder } from "../utils/emailTemplates.js";
import Subscription from "../models/Subscription.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date  has passed for subscription ${subscriptionId}. Stopping workflow`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder-${daysBefore} days before`,
        reminderDate
      );
    }

    await triggerReminder(
      context,
      `Reminder ${daysBefore} days before`,
      subscription
    );
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate(
      "user",
      "name, email"
    );
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);
    // send reminder email **after sleep**
    await sendEmail({
      to: subscription.user.email,
      subject: `Your subscription renews in ${daysBefore} day(s)!`,
      html: subscriptionReminder({
        name: subscription.name,
        renewalDate: subscription.renewalDate,
      }),
    });
  });
};
