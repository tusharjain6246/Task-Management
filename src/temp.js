{sortOn==='Date' && taskList.length>0 &&(
    taskList.sort((a,b)=>{
      var a_date = a.deadline.split('-').reverse().join('');
      var b_date = b.deadline.split('-').reverse().join('');
      return a_date > b_date ? 1 : a_date < b_date ? -1 : 0;
    }).map(item=>{
      var time = moment(item.deadline, "DD-MM-YYYY").fromNow();
      return (
        // <div className= {"item clearfix " + item.type} id={item.id}>
        //   <div className="item__description">{item.description}</div>
        //   <div className="right clearfix">
        //     <div className="item__value">{item.value}</div>
        //     <div className="item__delete">
        //       <button onClick={this.delete}  className="item__delete--btn"><i className="ion-ios-close-outline"></i></button>
        //     </div>
        //   </div>
        // </div>

        <Grid textAlign = "center" verticalAlign = "middle" >

        <Grid.Column style = {{maxWidth:"80vw"}}>


        <Segment raised>

          <Segment.Inline>

            <Header as='h2' floated='left'>{item.taskTitle}</Header>
            <Header as='h5' sub floated="left"> DUE {time}</Header>
            <Label as='a' color={item.complete==='Complete'? "green":"red"}><h5>{item.complete}</h5></Label>
            <b>Priority:</b><Label as='a' color={item.priority==='High'?"red": "green"}><h5>{item.priority}</h5></Label>
            <Button icon floated="right"><Icon name="delete" onClick={deleteTask}/></Button>
            <Button icon floated='right' >< Icon name= "edit"  color = "black"/></Button>

          </Segment.Inline>

          <Divider clearing />
          <p fluid>{item.taskDescription}</p>
        </Segment>
        </Grid.Column>
        </Grid>

      )
      // return <div>{this.news}</div>
    })

)}
{sortOn==='Priority' && taskList.length>0 &&(

    taskList.sort((a,b)=>{
      var a_high = a.priority==="High"?1:0;
            var b_high = b.priority==="High"?1:0;
            return b_high-a_high;
    }).map(item=>{
      var time = moment(item.deadline, "DD-MM-YYYY").fromNow();
      return (
        // <div className= {"item clearfix " + item.type} id={item.id}>
        //   <div className="item__description">{item.description}</div>
        //   <div className="right clearfix">
        //     <div className="item__value">{item.value}</div>
        //     <div className="item__delete">
        //       <button onClick={this.delete}  className="item__delete--btn"><i className="ion-ios-close-outline"></i></button>
        //     </div>
        //   </div>
        // </div>

        <Grid textAlign = "center" verticalAlign = "middle" >

        <Grid.Column style = {{maxWidth:"80vw"}}>


        <Segment raised>

          <Segment.Inline>

            <Header as='h2' floated='left'>{item.taskTitle}</Header>
            <Header as='h5' sub floated="left"> DUE {time}</Header>
            <Label as='a' color={item.complete==='Complete'? "green":"red"}><h5>{item.complete}</h5></Label>
            <b>Priority:</b><Label as='a' color={item.priority==='High'?"red": "green"}><h5>{item.priority}</h5></Label>
            <Button icon floated="right"><Icon name="delete" onClick={deleteTask}/></Button>
            <Button icon floated='right' >< Icon name= "edit"  color = "black"/></Button>

          </Segment.Inline>

          <Divider clearing />
          <p fluid>{item.taskDescription}</p>
        </Segment>
        </Grid.Column>
        </Grid>

      )
      // return <div>{this.news}</div>
    })

)}
