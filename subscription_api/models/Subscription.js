import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "KSH"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "education",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value < new Date();
        },
        message: "Start date must be past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Auto-calculate the renewal date

SubscriptionSchema.pre("save", function () {
  if (!this.renewalDate) {
    this.renewalDate = new Date(this.startDate);

    switch (this.frequency) {
      case "daily":
        this.renewalDate.setDate(this.renewalDate.getDate() + 1);
        break;

      case "weekly":
        this.renewalDate.setDate(this.renewalDate.getDate() + 7);
        break;

      case "monthly":
        this.renewalDate.setMonth(this.renewalDate.getMonth() + 1);
        break;

      case "yearly":
        this.renewalDate.setFullYear(this.renewalDate.getFullYear() + 1);
        break;
    }
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
