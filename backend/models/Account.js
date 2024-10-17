import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "You must provide an email"],
        validate: [
            {
                validator: (email) => email.includes("Tuwaiq"),
                message: "Email must be a Tuwaiq student email"
            },
            {
                validator: (email) => {
                    return String(email).toLowerCase().match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                },
                message: "Not a valid email"
            }
        ]
    },
    password: String,
    userType: String
});

const Account = mongoose.model("Account", AccountSchema);
export default Account;
