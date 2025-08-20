const cds = require('@sap/cds')

module.exports = class ExpenseService extends cds.ApplicationService { init() {

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
  const isDataCorrect = async(data)=>{
    try{
      return true;
    }
    catch(error){
      console.log(error.message);
      return false;
    }
  }
  this.on('registerUser', async(req)=>{
    const {firstName, lastName, email, password } = req.data;
    const existing = await SELECT.one.from(Users).where({ email });
    if(existing){
      return req.error(400,"User Already exists");
    }
    if(isDataCorrect(req.data)){
    await INSERT.into(Users).entries({firstName:firstName,lastName:lastName,email:email,password:password});}
    return {success:true};
  });
  this.on('login',async(req)=>{
    const {email,password}= req.data;
    const existUser = await SELECT.one.from(Users).where({ email });
    if(!existUser){
      return req.error(400,"USER NOT FOUND")
    }
    if(password!=existUser.password){
      return req.error(500,"Wrong Password");
    }
    return {success:true, email: existUser.email, firstName: existUser.firstName};
  });


  return super.init()
}}
