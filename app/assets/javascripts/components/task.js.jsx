class Task extends React.Component{

  constructor(props){
    super(props);
    this.state = { editable: false }
    this.handleEdit = this.handleEdit.bind(this)
  }

	handleEdit(){
		if(this.state.editable){
      let title = this.title.value
      let description = this.description.value
      let position = this.position.value
      let start_date = this.start_date.value
      let end_date = this.end_date.value
      let id = this.props.task.id
      let section_id = this.props.task.section_id
      let task = {id: id, title: title, description: description, position: position, start_date: start_date, end_date: end_date}
      this.props.handleUpdate(task)
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  render(){
		let title = this.state.editable ? <input type='text' ref={input => this.title = input} defaultValue={this.props.task.title}/>:<h3>{this.props.task.title}</h3>
    let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.task.description}/>:<p>{this.props.task.description}</p>
    let position = this.state.editable ? <input type='text' ref={input => this.position = input} defaultValue={this.props.task.position}/>:<p>{this.props.task.position}</p>
    let start_date = this.state.editable ? <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>:<p>{this.props.task.start_date}</p>
    let end_date = this.state.editable ? <input type='text' ref={input => this.end_date = input} defaultValue={this.props.task.end_date}/>:<p>{this.props.task.end_date}</p>
    return(
      <div>
        {title}
        {description}
        {position}
        {start_date}
        {end_date}
        <button onClick={() => this.handleEdit()}> {this.state.editable? 'Submit' : 'Edit Task'}</button>
        <button onClick={() => this.props.handleDelete(this.props.task)}>Delete Task</button>
       
      </div>
    )      
  }
}