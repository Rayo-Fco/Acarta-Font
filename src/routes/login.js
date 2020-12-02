import axios from 'axios'


export async function post(req, res) {
    
      const { email, password } = req.body;
      const user = {
        email:  req.body.email,
        password:  req.body.password
    }
      return await axios.post('http://localhost:3001/login', user)
      .then(response => {
        const { token } = response.data
        req.session.token = token;
        res.end(JSON.stringify({ token: req.session.token }));
      }).catch(err =>{
        console.log(err);
        res.end(JSON.stringify(err.response.data));
      })
  }