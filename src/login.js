import React from "react";
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link, Navigate } from "react-router-dom";


class Login extends React.Component {

  state={
    firstName:'',
    email: '',
    password:'',
    id: 0,
    errors:[],
    load: false
  }
  formEmpty=({email, password})=>{
    return !(email.length || password.length);
  };



  validForm = ({email, password})=>email && password;

  dispalyError = errors => <span>{errors[0].message}</span>;

  handleChange = event =>{
    this.setState({[event.target.name]: event.target.value})
  }
  submitHandle = async event=>{
    if(this.validForm(this.state)){
      this.setState({erros:[], load: true});
      event.preventDefault();
      const data = {'email':this.state.email,
                    'password': this.state.password};
      console.log(data);
      try {
          let prom = await fetch(`http://localhost:3001/login/${this.state.email}/${this.state.password}`);
          if(prom.ok){
              let res = await prom.json();
              console.log(res.todos[0]);
              this.setState({load: false, firstName: res.todos[0].firstName, id: res.todos[0]._id});
          }
          else {
              let error;
              error = {message: "invalid username or password"};
              this.setState({errors:this.state.errors.concat(error),load: false});
            }
      } catch (err) {
          console.error(err);
          this.setState({errors:this.state.errors.concat(err),load: false});
      }
    }
  };

  renderRedirect = () => {
    // console.log(this.state.email);
    // console.log(this.state.password);
    // console.log(this.state.name);
    if (this.state.email !== '' && this.state.password !== '' && this.state.firstName !== '' && this.state.id !==0) {
      return(
        <Navigate
          to={`/App/${this.state.firstName}/${this.state.id}`}
        />
      );
    }
  };

  render() {
    const {email, password, errors, load} = this.state;
    return(
      <Grid textAlign = "center" verticalAlign = "middle" className="app">
        <Grid.Column style = {{maxWidth: 450}}>
           <Header as="h1" icon color="violet" textAlign = "center">

              Login for TestApp
           </Header>
           <Form onSubmit={this.submitHandle} size = "large">
              <Segment stacked>
                  <Form.Input fluid name= "email" icon= "mail" iconPosition = "left" placeholder = "email address" onChange = {this.handleChange} type = "email" value={email}/>
                  <Form.Input fluid name= "password" icon= "lock" iconPosition = "left" placeholder = "password" onChange = {this.handleChange} type = "password" value={password}/>
                  <Button  disabled={load} className ={load ?'loading':''} color = "violet" fluid size="large">submit{this.renderRedirect()}</Button>

              </Segment>

           </Form>
           {errors.length>0 &&(
             <Message error>
              <h3>error</h3>
              {this.dispalyError(errors)}
             </Message>
           )}
           <Message > Don't have an account? <Link to='/'>Register</Link></Message>
           <Message > <Link to='/ForgetPassword'>Forget Password</Link></Message>
        </Grid.Column>
      </Grid>
    );
  }
}
// const WithLogin  =Login;


export default Login;
