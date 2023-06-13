const { User, Category, Order, Service } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // Query user thats logged in using context.username
    me: async (parent, args, context) => {
      if (context.user) {
        const findUser = await User.findOne({ _id: context.user._id }).populate(
          "orders"
        );
        return findUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Query Categories - Works tested 6/2
    // categories: async () => {
    //   const categories = await Category.find();
    //   return categories;
    // },

    service: async (parent, { serviceId }) => {
      return Service.findOne({ _id: serviceId })
        .populate("serviceCategory")
        .populate("serviceProviders");
    },

    // Query Services
    // Added a way to limit results
    services: async (_, { limit }) => {
      const services = await Service.find()
        .populate("serviceCategory")
        .populate("serviceProviders")
        // allows services query to be queried in the front-end with a limit qty
        .limit(limit);

      return services;
    },

    //providers
    providers: async (_, { limit }) => {
      const providers = await User.find({ isProvider: true })

        // allows services query to be queried in the front-end with a limit qty
        .limit(limit);

      return providers;
    },
    getAllCategoriesWithServices: async () => {
      try {
        // Retrieve all categories
        const categories = await Category.find();
        // Fetch services for each category
        const categoriesWithServices = await Promise.all(
          categories.map(async (category) => {
            const services = await Service.find({
              serviceCategory: category._id,
            });
            return { ...category.toObject(), services };
          })
        );
        return categoriesWithServices;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch categories with services");
      }
    },

    getMyServices: async (parent, args, context) => {
      if (context.user) {
        try {
          const services = await Service.find({
            serviceProviders: context.user._id,
          }).populate("serviceCategory");
          return services;
        } catch (error) {
          console.error(error);
          throw new Error("Failed to fetch categories with services");
        }
      }
    },

    orders: async (parent, args, context) =>
      Order.find({ user: context.user._id })
        .populate("services")
        .populate("provider")
        .populate("user").sort({ orderDate: -1 }),
  },

  Mutation: {
    // addUser functionaly tested in graphql
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // login, works, returns token
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    // Working when added with IDs
    addService: async (parent, args) => {
      const newService = await Service.create(args);
      return newService;
    },
    // Add Category - Tested works 5.31
    addCategory: async (parent, { categoryName }) => {
      const newCategory = await Category.create({
        categoryName,
      });
      return newCategory;
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        const deleteAccount = User.findByIdAndDelete({ _id: context.user._id });
        return deleteAccount;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updatePassword: async (parent, { _id, password, newPassword }) => {
      // console.log(context.user)
      const oldPassword = password;
      // const userId = context.user._id;
      const user = await User.findById(_id);
      // console.log(user);
      const correctPw = await user.isCorrectPassword(oldPassword);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      newPassword = await bcrypt.hash(newPassword, 10);

      const updatePw = User.findByIdAndUpdate(
        { _id },
        { password: newPassword },
        { new: true }
      );
      return updatePw;
    },
    addOrder: async (
      parent,
      { services, provider, serviceDate, orderPrice },
      context
    ) => {
      if (context.user) {
        const order = new Order({
          services: services,
          user: context.user._id,
          provider: provider,
          serviceDate,
          orderPrice,
        });
        await order.save();
        return order;
      }

      throw new AuthenticationError("Not logged in");
    },

    updateProviderStatus: async (parent, args, context) => {
      if (context.user) {
        const providerStatus = await User.findByIdAndUpdate(
          context.user._id,
          {
            isProvider: args.isProvider,
          },
          { new: true }
        );
        return providerStatus;
      }
      throw new AuthenticationError("Not logged in");
    },

    updateServiceProviderList: async (parent, { serviceId }, context) => {
      if (context.user) {
        const updatedServices = await Service.findOneAndUpdate(
          { _id: serviceId },
          { $pull: { serviceProviders: context.user._id } },

          { new: true }
        );
        return updatedServices;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
