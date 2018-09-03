class Section extends React.Component{

constructor(props){
    super(props);
    this.state = { tasks: [], editable: false, isClicked : false }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewTask = this.addNewTask.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateSectionTask = this.updateSectionTask.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
    this.showTaskForm = this.showTaskForm.bind(this)
  }

  componentDidMount(){
    var self = this;
    $.ajax({
      url: '/boards/' + this.props.section.board_id + '/sections/' + this.props.section.id + '/tasks',
      success: function(data) {
        self.setState({ tasks: data });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  }

  handleFormSubmit(section, name, description, position, start_date, end_date){
    let body = {title: name, description: description, position: position, start_date: start_date, end_date: end_date} 

    var self = this;
    $.ajax({
      url: '/boards/'+ section.board_id + '/sections/'+ section.id + '/tasks',
      data: { task: body },
      method: 'POST',
      success: function(data) {
        self.addNewTask(section, data)
      },
      error: function(xhr, status, error) {
        alert('Cannot create board at the moment. Please try later.: ', status, xhr, error);
      }
    });
  }

  addNewTask(section, task){
    this.setState({
      tasks: this.state.tasks.concat(task)
    })
  }

	handleEdit(){
		if(this.state.editable){
      let name = this.name.value
      let description = this.description.value
      let position = this.position.value
      let id = this.props.section.id
      let section = {id: id, name: name, description: description, section_position: position}
      this.props.handleUpdate(id, section)
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  handleUpdate(task){
    $.ajax({
      method: 'PUT',
      url: '/boards/' + this.props.section.board_id + '/sections/' + task.section_id + '/tasks/' + task.id,
      data: { task:  task },
      success: function(data) {
        this.updateSectionTask(task)
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot update requested record: ', error);
      }
    });  
  }

  updateSectionTask(task){
    let newTasks = this.state.tasks.filter((f) => f.id !== task.id)
    newTasks.push(task)
    this.setState({
      tasks: newTasks
    })
  }

  handleDelete(task){
    $.ajax({
      method: 'DELETE',
      url: '/boards/' + this.props.section.board_id + '/sections/' + task.section_id + '/tasks/' + task.id,
      success: function(data) {
        this.deleteSection(task.id)
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot delete requested record: ', error);
      }
    });
  }

  deleteSection(id){
    newTasks = this.state.tasks.filter((task) => task.id !== id)
    this.setState({
      tasks: newTasks
    })
  }
 //  handleAddSection(id){
 //    $.ajax({
 //      method: 'POST',
 //      url: '/boards/' + id + '/sections',
 //      //data: { board: board },
 //      success: function(data) {
 //        this.updateBoardSection(board)
 //      }.bind(this),
 //      error: function(xhr, status, error) {
 //        alert('Cannot update requested record: ', error);
 //      }
 //    });  
 //  }
  // updateBoardSection(board, section){
  //   let newSections = board.filter((f) => f.id !== board.id)
  //   newBoards.push(board)
  //   this.setState({
  //     boards: newBoards
  //   })
  // }

  showTaskForm(){
    this.setState({isClicked : !this.state.isClicked});
  }
  render(){

		let name = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.section.name}/>:<h3>{this.props.section.name}</h3>
    let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.section.description}/>:<p>{this.props.section.description}</p>
    let position = this.state.editable ? <input type='text' ref={input => this.position = input} defaultValue={this.props.section.section_position}/>:<p>{this.props.section.section_position}</p>

    let someElementClass = this.state.isClicked ? '' : 'display-none';

    return(
      <div className="card h-100">
        
        <div className="card-body">
          <button className="pull-right" onClick={() => this.handleEdit()}> {this.state.editable? 'Submit' : 'Edit Section'}</button>
          <button className="pull-right" onClick={() => this.props.handleDelete(this.props.section)}>Delete Section</button>
          <h4 className="card-title">
            <a href="#">{name}</a>
          </h4>
          <h5>{position}</h5>
          <div className="card-text">{description}</div>
        </div>
        <div className="card-footer">
          <a className="pull-right" onClick={(event) => this.showTaskForm(event)}> 
            <img src="/assets/add-plus-new-outline-stroke_763486.png" alt="" title="Add Tasks" />
          </a>

          <div className={someElementClass}>
            <NewTask section={this.props.section} handleFormSubmit={this.handleFormSubmit} />
          </div>
          <AllTasks tasks={this.state.tasks} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} />
        </div>
      </div>
    )      
  }
}