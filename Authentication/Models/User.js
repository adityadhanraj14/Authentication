import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        minlength:[2,'First name must be at least 2 characters long']
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        minlength:[2,'Last name must be atleast 2 characters long']
    },
    contactNumber:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        match:[/^[0-9]{10}$/, 'Please enter a valid 10-digit contact number']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },

    password:{
        type:String,
        required:[true, 'Password is required'],
        minlength:[6,'Password must be atleast 6 characters long']
    }
    },{
        timestamps:true
    
});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        return await bcrypt.compare(candidatePassword, this.password);

    }catch(error){
        throw new Error(error)
    }
};


const User = mongoose.model('User',userSchema);
export default User;