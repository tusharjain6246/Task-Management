import React from "react";
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link, Navigate } from "react-router-dom";

class Forget extends React.Component {

  state={
    firstName:'',
    email: '',
    id:0,
    errors:[],
    otp:0,
    enteredOTP:0,
    password:'',
    passwordConfirmation:'',
    load: false
  }
  formEmpty=({email})=>{
    return !email.length;
  };



  validForm = ({email})=>email;
  // validOtp = ({otp, enteredOTP})=>{
  //   return otp == enteredOTP;
  // };
  validPassword = ({password, passwordConfirmation})=>{
    if(password.length<5 || passwordConfirmation.length<5)
      return false;
    if((password !==passwordConfirmation))
      return false;
    return true;
  };
  newFormEmpty=({email, password, passwordConfirmation})=>{
    return ! (email.length || password.length || passwordConfirmation.length);
  };

  dispalyError = errors => <span>{errors[0].message}</span>;

  handleChange = event =>{
    this.setState({[event.target.name]: event.target.value})
  }
  submitHandle = async event=>{
    if(this.validForm(this.state)){
      this.setState({erros:[], load: true});
      event.preventDefault();
      const data = {'email':this.state.email};
      console.log(data);

      // var min = 100000;
      // var max = 999999;
      // var o = Math.floor(Math.random() * (max - min + 1) ) + min;
      // this.setState({otp:o});
      // console.log(this.state.otp);

      try {

          let prom = await fetch(`http://localhost:3001/forget/${this.state.email}`);
          if(prom.ok){
              let res = await prom.json();
              console.log(res.todos[0]);
              //console.log(res.otp);
              this.setState({load: false,otp:res.otp, firstName: res.todos[0].firstName, id: res.todos[0]._id});
              console.log("state otp ", this.state.otp);
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

    if (this.state.email !== '' && this.state.firstName !=='' && this.state.id !==0) {
      return(
        <Navigate
          to={`/App/${this.state.firstName}/${this.state.id}`}
        />
      );
    }
  };
  newSubmitHandle = async event=>{
    console.log(this.state.otp + " " + this.state.enteredOTP);
    if(this.valid()){
      this.setState({erros:[], load: true})
      event.preventDefault();
      console.log("new form submitted successfullty");
      const data = await {
        'email':this.state.email,
        'password': this.state.password
      };
      console.log(data);
      const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        }
      };
      try {
          let prom = await fetch('http://localhost:3001/reset',options);
          if(prom.ok){
              let res = await prom.json();
              // console.log(prom.status);
              // console.log(res.todos._id);
              console.log(res);
          }
          else {
              let error;
              error = {message: "not able to reset password"};
              this.setState({errors:this.state.errors.concat(error),load: false});
            }
      } catch (err) {
          console.error(err);
          this.setState({errors:this.state.errors.concat(err),load: false});
      }
    }
  }
  valid=()=>{
    let error;
    let errors = [];
    if(this.newFormEmpty(this.state)){
      error = {message: "Fill all the fields"};
      this.setState({errors: errors.concat(error)});
      return false;
    }
    else if(this.state.otp != this.state.enteredOTP){
      error = {message: "invalid otp"};
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



  render() {
    const {email,otp,enteredOTP,password, passwordConfirmation, errors, load} = this.state;
    return(
      <Grid textAlign = "center" verticalAlign = "middle" className="app">
        <Grid.Column style = {{maxWidth: 450}}>
           <Header as="h1" icon color="violet" textAlign = "center">
            <Icon name = "code branch" color = "red"/>
              Enter new Password
           </Header>
           <Form onSubmit={this.submitHandle} size = "large">
              <Segment stacked>
                  <Form.Input fluid name= "email" icon= "mail" iconPosition = "left" placeholder = "email address" onChange = {this.handleChange} type = "email" value={email}/>
                  <Button  disabled={load} className ={load ?'loading':''} color = "violet" fluid size="large">submit</Button>

              </Segment>

           </Form>
           {otp != 0 &&(
             <Form onSubmit={this.newSubmitHandle} size="large">
             <Segment stacked>
                 <Form.Input fluid name= "enteredOTP" icon= "mail" iconPosition = "left" placeholder = "Enter OTP" onChange = {this.handleChange} type = "text" value={enteredOTP}/>
                 <Form.Input fluid name= "password" icon= "lock" iconPosition = "left" placeholder = "password" onChange = {this.handleChange} type = "password" value={password}/>
                 <Form.Input fluid name= "passwordConfirmation" icon= "repeat" iconPosition = "left" placeholder = "password Confirmation" onChange = {this.handleChange} type = "password" value={passwordConfirmation}/>
                 <Button  disabled={load} className ={load ?'loading':''} color = "violet" fluid size="large">submit </Button>
             </Segment>
             </Form>
           )}
           {errors.length>0 &&(
             <Message error>
              <h3>error</h3>
              {this.dispalyError(errors)}
             </Message>
           )}
           {otp !=0 &&(
             <Message>Please Enter  {this.state.otp}
             </Message>
           )}

        </Grid.Column>
      </Grid>

    );
  }
}

const WithForget  =Forget;


export default WithForget;
