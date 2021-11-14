import React from "react";
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link, Navigate } from "react-router-dom";

class Register extends React.Component {
  state={
    firstName: '',
    lastName:'',
    email: '',
    password:'',
    passwordConfirmation:'',
    errors:[],
    id:0,
    load: false
  }
  formEmpty=({firstName,lastName, email, password, passwordConfirmation})=>{
    return !(firstName.length ||lastName.length|| email.length || password.length || passwordConfirmation.length);
  };

  validPassword = ({password, passwordConfirmation})=>{
    if(password.length<5 || passwordConfirmation.length<5)
      return false;
    if((password !==passwordConfirmation))
      return false;
    return true;
  };

  validForm = ()=>{
    let error;
    let errors = [];
    if(this.formEmpty(this.state)){
      error = {message: "Fill all the fields"};
      this.setState({errors: errors.concat(error)});
      return false;
    }
    else if (!this.validPassword(this.state)) {
      error = {message: "Invalid Password"};
      this.setState({errors: errors.concat(error)});
      return false;
    }
    else{
      return true;
    }
  };

  dispalyError = errors => <span>{errors[0].message}</span>;

  handleChange = event =>{
    this.setState({[event.target.name]: event.target.value})
  }
  submitHandle = async event=>{
    if(this.validForm()){
      this.setState({erros:[], load: true})
      event.preventDefault();
      const data = {'firstName': this.state.firstName,
                    'lastName': this.state.lastName,
                    'email':this.state.email,
                    'password': this.state.password};
      console.log(data);
      const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        }
      };
      try {
          let prom = await fetch('http://localhost:3001/user',options);
          if(prom.ok){
              let res = await prom.json();
              console.log(prom.status);
              console.log(res.todos._id);
              this.setState({load: false, id: res.todos._id});
          }
          else {
              let error;
              error = {message: "email is already in use"};
              this.setState({errors:this.state.errors.concat(error),load: false});
            }
      } catch (err) {
          console.error(err);
          this.setState({errors:this.state.errors.concat(err),load: false});
      }
      // await fetch('http://localhost:3001/user',options).then((res)=>{
      //   if(res.status===200){
      //     console.log(res.data());
      //     console.log(res.status);
      //     this.setState({load: false});
      //   }
      //   else {
      //     let error;
      //     let errors = [];
      //     error = {message: "email is already in use"};
      //     this.setState({errors:this.state.errors.concat(error),load: false});
      //   }
      //
      // }).catch(err=>{
      //   console.error(err);
      //   this.setState({errors:this.state.errors.concat(err),load: false});
      // });
    }

  };
  renderRedirect = () => {
    if (this.state.email !== '' && this.state.password !== '' && this.state.firstName !== '' && this.state.lastName !== ''&& this.state.id !==0) {
      return(
        <Navigate
          to={`/App/${this.state.firstName}/${this.state.id}`}
        />
      );
    }
  };

  render() {
    const {firstName,lastName, email, password, passwordConfirmation, errors, load} = this.state;
    return(
      <Grid textAlign = "center" verticalAlign = "middle" className="app">
        <Grid.Column style = {{maxWidth: 450}}>
           <Header as="h2" color='orange' textAlign = "center">
            Sign Up for the TestApp
           </Header>
           <Form onSubmit={this.submitHandle} size = "large">
              <Segment stacked>
                  <Form.Input fluid name= "firstName" icon= "user" iconPosition = "left" placeholder = "First Name" onChange = {this.handleChange} type = "text" value={firstName}/>
                  <Form.Input fluid name= "lastName" icon= "user" iconPosition = "left" placeholder = "Last Name" onChange = {this.handleChange} type = "text" value={lastName}/>
                  <Form.Input fluid name= "email" icon= "mail" iconPosition = "left" placeholder = "email address" onChange = {this.handleChange} type = "email" value={email}/>
                  <Form.Input fluid name= "password" icon= "lock" iconPosition = "left" placeholder = "password" onChange = {this.handleChange} type = "password" value={password}/>
                  <Form.Input fluid name= "passwordConfirmation" icon= "repeat" iconPosition = "left" placeholder = "password Confirmation" onChange = {this.handleChange} type = "password" value={passwordConfirmation}/>
                  <Button disabled={load} className ={load ?'loading':''} color = "orange" fluid size="large">submit {this.renderRedirect()}</Button>

              </Segment>

           </Form>
           {errors.length>0 &&(
             <Message error>
              <h3>error</h3>
              {this.dispalyError(errors)}
             </Message>
           )}
           <Message>Already a user<Link to="/login">login</Link> </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

// const WithRegister  = Register;

export default Register;
