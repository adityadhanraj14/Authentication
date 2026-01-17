import User from '../Models/User.js';

const getSignup = (req, res) => {
    res.render('signup', { error: null, success: null });
}

const postSignup = async (req, res) => {
    try {
        // Check if email already exists
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.render('signup', { 
                error: `${req.body.email} already registered. Please use another email.`, 
                success: null 
            });
        }

        // Check if contact number already exists
        const existingContact = await User.findOne({ contactNumber: req.body.contactNumber });
        if (existingContact) {
            return res.render('signup', { 
                error: 'Contact number already registered.', 
                success: null 
            });
        }

        // If both are unique, create the user
        const user = new User(req.body);
        await user.save();
        
        console.log('User created successfully', req.body);
        res.render('signup', { error: null, success: 'Account created successfully!' });
        
    } catch (err) {
        console.log('Error creating user', err);
        res.render('signup', { error: err.message, success: null });
    }
}

export { getSignup, postSignup };