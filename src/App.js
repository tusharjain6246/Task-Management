//import logo from './logo.svg';
import React,{useState, useEffect } from 'react';
//import { withLastLocation } from 'react-router-last-location';
import {Grid, Form, Segment, Button, Header, Message, Icon, Checkbox, Divider, Container, Label} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import moment from 'moment';

import './App.css';
import {useParams, Link } from "react-router-dom";
const App = (props) =>{
  let { id } = useParams();

  // state={
  //   i: 0,
  //   username: '',
  //   errors:[],
  //   load: false,
  //   taskTitle:'',
  //   taskDescription:'',
  //   priority:'',
  //   deadline:'',
  //   completed: false,
  //   taskList:[]
  // }
  const [firstName,setFirstName] = useState('');
  const [taskTitle,setTaskTitle] = useState('');
  const [taskDescription,setTaskDescription] = useState('');
  const [priority,setPriority] = useState('');
  const [deadline,setDeadline] = useState('');
  const [complete,setComplete] = useState('');
  const [newPriority,setNewPriority] = useState('');
  const [newDeadline,setNewDeadline] = useState('');
  const [newComplete,setNewComplete] = useState('');
  const [load,setLoad] = useState(false);
  const [taskList,setTaskList] = useState([]);
  const [errors,setErrors] = useState([]);
  const [sortOn, setSortOn] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const[i, setI] = useState("1");
  const [delTask, setDelTask] = useState('');

    useEffect( async() => {
      console.log(id);
      try {
        let prom = await fetch(`http://localhost:3001/user/${id}`);
          if(prom.ok){
              let res = await prom.json();


              setFirstName(res.todos.firstName);
              setTaskList(res.todos.taskList);
              await console.log(taskList);
            }
      } catch (e) {
        console.log(e);
      }
    },[]);
  const handleTaskChange = (event,{value}) =>{
    setTaskTitle(value);
  }
  const handleDescriptionChange = (event,{value}) =>{
    setTaskDescription(value);
  }
  const handleDateChange = (event, {name, value}) => {

       setDeadline(value);
    }
  const handleCheckChange=(event, {value})=>{
    setComplete(value);
  }
  const handleSelectChange=(e,{value})=> setPriority(value);


  const handleNewDateChange = (event, {name, value}) => {
       setNewDeadline(value);
    }
  const handleNewCheckChange=(event, {value})=>{
    setNewComplete(value);
  }
  const handleNewSelectChange=(e,{value})=> setNewPriority(value);


  const submitHandle =async event=>{
    event.preventDefault();
    // console.log();
    var obj = {
        id: i,
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        deadline: deadline,
        complete: complete,
        priority: priority
    }
    setI((parseInt(i) + 1).toString());
    await setTaskList([...taskList, obj]);
  }
  // useEffect(()=>{
  //   console.log(taskList);
  // })

  const deleteTask=event=>{
    console.log("delete");
    var el = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    if(el.hasAttribute('id')){
      el = el.id;
    setTaskList(taskList.filter((item)=>(item._id !==el)));
    }
    else{
      el = el.className.split(' ');
      // console.log("no id exist", el[el.length-1]);
      setTaskList(taskList.filter((item)=>(item.id !==el[el.length-1])));
    }
  }
  const editTask = event=>{
    console.log("editing");

    var el = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    if(el.hasAttribute('id')){
      el = el.id;
    // setTaskList(taskList.filter((item)=>(item._id !==el)));
    }
    else{
      el = el.className.split(' ');
      el = el[el.length-1];
      // console.log("no id exist", el[el.length-1]);
      // setTaskList(taskList.filter((item)=>(item.id !==el[el.length-1])));
    }
    setIsOpen(!isOpen);
    setDelTask(el);
  }
  useEffect(()=>{
    console.log(delTask);
  })
  const resetTask = event=>{
    console.log("reset");
    console.log(newComplete, newDeadline, newPriority, delTask);
    var idx = taskList.findIndex(obj=>{
      if(obj.hasOwnProperty('_id')){
        return obj._id===delTask;
      }
      else {
        return obj.id ===delTask;
      }
    });
    console.log(taskList[idx]);
    taskList[idx].complete = newComplete;
    taskList[idx].deadline = newDeadline;
    taskList[idx].priority = newPriority;
    console.log(taskList);
    setTaskList(taskList);
    setIsOpen(!isOpen);
  }

  const addToMemory = async()=>{
    console.log('adding');
    const data = await {'_id': id,
                        "taskList": taskList};
      console.log(data);
      const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        }
      };
      try {
          let prom = await fetch('http://localhost:3001/add',options);
          if(prom.ok){
              let res = await prom.json();
              console.log(prom.status);
              console.log(res.todos._id);
              await this.setState({load: false, id: res.todos._id});
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
  }
  const handleSortChange = async(e,{value})=>{
    console.log(value);
    if(value==='Priority'){
        console.log("sort by priority");

        taskList.sort((a,b)=>{
          var a_high = a.priority==="High"?1:0;
          var b_high = b.priority==="High"?1:0;
          return b_high-a_high;
        });
        setSortOn(value);
      }
      else{
        console.log("sort by date");
        taskList.sort((a,b)=>{
          var a_date = a.deadline.split('-').reverse().join('');
          var b_date = b.deadline.split('-').reverse().join('');
          return a_date > b_date ? 1 : a_date < b_date ? -1 : 0;
        });
        setSortOn(value);
      }




  }

  return(
    <div className="App">
      <div className="top">
        <div className="budget">
            <div className = "username">Welcome  {firstName}</div>
            <Button className = "save_btn" onClick={addToMemory}  size="large"><Link to="/login">SAVE</Link></Button>

        </div>



      </div>
      <Grid textAlign = "center" verticalAlign = "middle">
        <Grid.Column style = {{maxWidth:"60vw"}}>
        <Header as="h3" style={{paddingTop:'1rem'}}>Add task</Header>
        <Form onSubmit={submitHandle} >
            <Segment stacked>
                <Form.Input fluid name="taskTitle" placeholder="Title" type="text" onChange = {handleTaskChange} value={taskTitle}/>
                <Form.Input fluid name="taskDescription" placeholder="Add description" type="text" onChange = {handleDescriptionChange} value={taskDescription}/>
                <DateInput
                    name="deadline"
                    placeholder="Deadline"
                    value={deadline}
                    iconPosition="left"
                    onChange={handleDateChange}
                  />
                  <Form.Group inline>
                      <Form.Select placeholder="select Priority" onChange ={handleSelectChange}
                          options={[{key:"High",text:"High", value:"High"},{key:"Low",text:"Low", value: "Low"}]}
                          />
                      <Form.Field><Checkbox radio label='Completed' name='checkbox' value='Complete' checked={complete === 'Complete'} onChange={handleCheckChange}/></Form.Field>
                      <Form.Field><Checkbox radio label='Incomplete'name='checkbox' value='Incomplete' checked={complete === 'Incomplete'} onChange={handleCheckChange}/></Form.Field>
                  </Form.Group>

                <Button disabled={load} className ={load ?'loading':''} color = "orange" fluid size="large">submit</Button>

            </Segment>

         </Form>
         </Grid.Column>



      </Grid>
      <Grid>
      <Form.Select className="sort-form" placeholder="Sort By" onChange ={handleSortChange} floated = 'right' color="black"
          options={[{key:"Priority",text:"Priority", value:"Priority"},{key:"Date",text:"Date", value:"Date"}]}
          />
          </Grid>
      {taskList.length>0 &&(
                        taskList.map(item=>{
                          var time = moment(item.deadline, "DD-MM-YYYY").fromNow();
                          var el = item.hasOwnProperty('_id')?item._id : item.id;
                          return (

                            <Grid id={item._id} className={item.id} textAlign = "center" verticalAlign = "middle" >
                            <Grid.Row>
                            <Grid.Column style = {{maxWidth:"80vw"}}>


                            <Segment raised>

                              <Segment.Inline>

                                <Header as='h2' floated='left'>{item.taskTitle}</Header>
                                <Header as='h5' sub floated="left"> DUE {time}</Header>
                                <Label as='a' color={item.complete==='Complete'? "green":"red"}><h5>{item.complete}</h5></Label>
                                <b>Priority:</b><Label as='a' color={item.priority==='High'?"red": "green"}><h5>{item.priority}</h5></Label>
                                <Button icon floated="right"><Icon name="delete" onClick={deleteTask}/></Button>
                                <Button icon floated='right' >< Icon name= "edit" onClick={editTask} color = "black"/></Button>

                              </Segment.Inline>

                              <Divider clearing />
                              <p fluid>{item.taskDescription}</p>
                            </Segment>
                            </Grid.Column>
                            </Grid.Row>
                            {isOpen && delTask=== el && (
                              <Grid.Row textAlign = "center" verticalAlign = "middle" >
                              <Grid.Column style = {{maxWidth:"80vw"}}>
                              <Form onSubmit={resetTask}>
                              <Form.Group inline>
                                  <DateInput
                                    name="editDate"
                                    placeholder="Edit Due Date"
                                    value={newDeadline}
                                    iconPosition="left"
                                    onChange={handleNewDateChange}
                                  />
                                  <Form.Select placeholder="select New Priority" onChange ={handleNewSelectChange}
                                      options={[{key:"High",text:"High", value:"High"},{key:"Low",text:"Low", value: "Low"}]}
                                        />
                                  <Form.Field><Checkbox radio label='Completed' name='checkbox' value='Complete' checked={newComplete === 'Complete'} onChange={handleNewCheckChange}/></Form.Field>
                                  <Form.Field><Checkbox radio label='Incomplete'name='checkbox' value='Incomplete' checked={newComplete === 'Incomplete'} onChange={handleNewCheckChange}/></Form.Field>
                                  <Button icon floated='right' >< Icon name= "save" color = "black"/> Save</Button>
                              </Form.Group>
                              </Form>
                              </Grid.Column>
                              </Grid.Row>
                            )}
                            </Grid>
                          )
                        })

                    )}

    </div>
    );
}

export default App;
