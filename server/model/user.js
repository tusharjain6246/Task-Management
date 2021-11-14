const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    trim: true,
    required: true,
    default: ''
  },
  lastName:{
    type: String,
    trim: true,
    required: true,
    default: ''
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    default: '',
    validate:{
      validator: validator.isEmail
    }
  },
  i:{
    type: Number,
    default:0
  },
  password:{
    type: String,
    required: true,
    trim: true,
    defualt:'',
    minLength: 5
  },

  taskList:[{
    taskTitle:{
      type: String,
      // required: true,
      default:'',
      trim: true
    },
    complete:{
      type: String,
      required: true,
      default: "Incomplete"
    },
    taskDescription:{
        type: String,
        // required: true,
        trim: true
      },
      deadline:{
        type: String,
        required: true
      },
      priority:{
        type: String,
        trim: true,
        default:'High'
      }
  }]
  // incomeItems:[{
  //   type:{
  //     type: String,
  //     // required: true,
  //   },
  //   id:{
  //     type: Number
  //   },
  //   description:{
  //     type: String,
  //     // required: true,
  //     trim: true
  //   },
  //   value:{
  //     type: Number,
  //     // required: true,
  //   }
  // }],
});

// userSchema.methods.generate = ()=>{
//   var user = this;
//
// }

var User =  mongoose.model('User', userSchema);
module.exports = {User};
