import user from '../models/User.js'


const userController ={};

userController.createNewUser = (req,res) => {
    
    let newUser = req.body
    
    user.findOne({cpf:newUser.cpf, name:newUser.name},(error, data) => {

       if (error) {

        console.log('deu erro')
        res.send('deu erro')

     
       }else if (null == data) {
            newUser = new user(req.body)
            newUser.save((error) => {

            if(error) {

                res.status(500).send(`${error.message}- Não foi possivel cadastrar`)

            }else{

                res.status(201).send(`Usuário cadastrado com sucesso ${newUser}`)
            }
            })

            


        }else if ((newUser.cpf == data.cpf && newUser.email == data.email)) {

            console.log(newUser.cpf,data.cpf)

            console.log('usuário já cadastrado')
            res.send("usuário já cadastrado")
           
            
        } 
    })
}

userController.userLogin = (req,res) => {
    
    let login = req.body;

    user.findOne({name:login.name,password:login.password},(error,data) => {
        console.log(data)
        
        if(error) {

            console.log('Deu erro no login');
            res.status(500).send('Erro no login !!');

        }else if (data == null){
            console.log('Usuário não cadastrado !');
            res.send('Usuário não cadastrado !');

        }else if(login.name == data.name && login.password == data.password ){

            console.log ("login efetuado com sucesso !!");
            res.send('login efetuado com sucesso')
        }

    })
}

userController.userDelete = (req,res) => {
    
    let deleteUser = req.body;
    
    user.findOneAndDelete({name:deleteUser.name, email:deleteUser.email, cpf:deleteUser.cpf, password:deleteUser.password},(error) => {

        console.log(deleteUser)

        if(error) {
            console.log("Erro ao deletar esse usuário ! ");
            res.status(500).send(`${error.mensage} Erro ao deletar o usuário !`);

        
        }else {
            console.log("Usuário deletado com sucesso !")
            res.status(200).send("Usuário deletado com Sucesso !")
        }
    })
}

userController.userUpdate = (req,res) => {
    
    const updateUser = req.body;

    user.findOneAndUpdate({name:updateUser.name, email:updateUser.email},{$set: updateUser},(error) => {
        if(!error) {
            res.status(200).send("Seus dados foram atualizados com sucesso !");
            console.log("Seus dados foram atualizados com sucesso !");

        }else {
            res.status(500).send(`${error.mensage}: Erro na atualização !!`);
            console.log(`${error.mensage}: Erro na atualização !!`)

        }
    });


}


export default userController;