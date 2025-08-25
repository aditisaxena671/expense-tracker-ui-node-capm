const cds = require('@sap/cds')

module.exports = class ExpenseService extends cds.ApplicationService {
  init() {

    const { Users, Expenses, Categories } = cds.entities('ExpenseService')
    this.on('getTotalExpensesByUser', async (req) => {
      const { userId } = req.data;
      if (!userId) return req.error(400, 'User ID is required');

      const result = await SELECT.from(Expenses)
        .columns('amount')
        .where({ user_ID: userId });

      const total = result.reduce((sum, e) => sum + Number(e.amount), 0);
      return { userId, total };
    });
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    const isDataCorrectForRegister = async (data, req) => {
      const { firstName, lastName, email, password } = data;
      try {
        if (!firstName) {
          return req.error(500, "First name should not be empty")
        }
        if (firstName.length < 4) {
          return req.error(500, "First name should not be less than 4 characters");
        }

        if (!lastName) {
          return req.error(500, "Last name should not be empty")
        }
        if (lastName.length < 4) {
          return req.error(500, "Last name should not be less than 4 characters");
        }
        if (!validateEmail(email)) {
          return req.error(500, "Invalid Email Id");
        }
        var minNumberofChars = 6;
        var maxNumberofChars = 25;
        var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,25}$/;
        if (password.length < minNumberofChars || password.length > maxNumberofChars) {
          return req.error(500, "Password's length should be between 6-25 characters");
        }
        if (!regularExpression.test(password)) {
          return req.error(500, "Please enter a strong password");
        }
        return true;
      }
      catch (error) {
        console.log(error.message);
        return false;
      }
    }
    this.on('registerUser', async (req) => {
      const { firstName, lastName, email, password } = req.data;
      const existing = await SELECT.one.from(Users).where({ email });
      if (existing) {
        return req.error(400, "User Already exists");
      }
      if (isDataCorrectForRegister(req.data, req)) {
        await INSERT.into(Users).entries({ firstName: firstName, lastName: lastName, email: email, password: password });
        return { success: true };
      }
      return req.error(400, "something went wrong");
    });
    const isDataCorrectForLogin = async (data, req) => {

      const { email, password } = data;
      if (!email) {
        return "Email can't be empty"
      }
      if (!validateEmail(email)) {
        return "Invalid Email ID"
      }
      if (!password) {
        return "Password can't be empty"
      }
      return true;
    }
    this.on('login', async (req) => {
      const { email, password } = req.data;
      const validation = await isDataCorrectForLogin(req.data);
      if (validation !== true) {
        return req.error(400, validation);
      }
      else {
        const existUser = await SELECT.one.from(Users).where({ email });
        if (!existUser) {
          return req.error(400, "USER NOT FOUND")
        }
        if (password != existUser.password) {
          return req.error(500, "Wrong Password");
        }
        var results={
           email: existUser.email, firstName: existUser.firstName , loginID:existUser.ID
        }
        return { success: true,results : results};
      }
    });
    return super.init()
  }
}

