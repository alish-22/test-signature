// authController.js

// ... imports (User, bcrypt, jwt)

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // You already have this line

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter all fields' }); // MODIFIED
    }

    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' }); // MODIFIED
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name, // Make sure User model has 'name' field
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create and sign JWT token
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ success: false, message: 'Server Error during token creation' }); // MODIFIED
        }
        // MODIFIED: Added success: true and structured user data
        res.status(201).json({
          success: true,
          message: 'User registered successfully!',
          token: token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' }); // MODIFIED
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter all fields' }); // MODIFIED
    }

    // Check for existing user
    let user = await User.findOne({ email });
    if (!user) { // It should be if user NOT found
      return res.status(400).json({ success: false, message: 'Invalid credentials' }); // MODIFIED
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' }); // MODIFIED
    }

    // Create and sign JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ success: false, message: 'Server Error during token creation' }); // MODIFIED
        }
        // MODIFIED: Added success: true and structured user data
        res.json({
          success: true,
          message: 'Logged in successfully',
          token: token,
          user: {
            id: user.id,
            name: user.name, // Make sure your User model has 'name' if you want to send it
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' }); // MODIFIED
  }
};