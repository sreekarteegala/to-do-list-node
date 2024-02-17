const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        "firstname": String,
        "lastname": String,
        "username": String,
        "password": String,
        "isActive": {
            "type": Boolean,
            "default": true
        }
    },
    {
        timestamps: true
    }
)

UserSchema.method('toJSON', function () {
    const { ...object } = this.toObject();

    object.fullname = object.firstname + " " + object.lastname;

    return object;
})

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;