// const validation = (req,res,next)=>{
//  let error=[];
//  let {name,desc,price,imageUrl}=req.body;
//  if(!name || name=='')
//    error.push('Please Enter some name')

//  if(!price || price<=0)
//    error.push('Price must be greater than zero')

//  try{
//    const validUrl= new URL(imageUrl);
//  }
//  catch(err){
//    error.push('Enter a valid URL')
//  }
//  if(error.length>0)
//  {
//    return res.render('new-products',{error:error[0]});
//  }
//  next();

// }

// export default validation;

// third party validator

import { body, validationResult } from "express-validator";

const validation = async (req, res, next) => {
  // 1. Setup rules for validation
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be greater then zero"),
    body("imageUrl").isURL().withMessage("Invalid URL"),
  ];
  // 2. Run the rules

  await Promise.all(
    rules.map((rule)=>rule.run(req))
  )
  // 3 check if there is  error after running rules
  const valres=validationResult(req);
   if(!valres.isEmpty())
   {
    return res.render('new-products',{'error':valres.array()[0].msg})
   }
   next();
};
export default validation;