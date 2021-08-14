const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
    middleName : { type: String, required: true },
    address : { type: String, required: true },
    email : { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        validate: [emailValidator, 'Invalid mail format']
    },
    phNumber : { type: String, required: true },
    height : { type: String, required: true },
    weight : { type: String, required: true },
    submittedBy : { type: Schema.Types.ObjectId, ref: 'user' },
    submittedOn:  { type: Date, default: Date.now }
});

function emailValidator(value) {
    return /^.+@.+\..+$/.test(value);
}

module.exports = mongoose.model('formData', formSchema);
