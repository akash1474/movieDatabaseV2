const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide your email!!"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [8, "Password should be greater than or equal to 8"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm the password"],
        validate: {
            //RUNS ONLY WHILE SAVING
            validator: function (el) {
                return el === this.password;
            },
            message: "Password are not the same",
        },
    },
});

userSchema.pre("save", async function (next) {
    //Only run this fn if the password was modified
    if (!this.isModified("password")) return next();
    //Hashing the password
    this.password = await bcrypt.hash(this.password, 12);
    //Clearing the passwordConfirm
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (canditatePass, userPass) {
    return await bcrypt.compare(canditatePass, userPass);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
