
const register = async (req,res)=>{
    const {userName,email,password} = req.body;
}

const login = async (req,res)=>{
    const {email,password} = req.body;

}


export {register,login}