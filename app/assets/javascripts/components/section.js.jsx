class Section extends React.Component{

constructor(props){
    super(props);
    this.state = { tasks: [], editable: false }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  // componentDidMount(){
  //   console.log(this);
  //   var self = this;
  //   $.ajax({
  //     url: '/board/' + board.id,
  //     success: function(data) {
  //       self.setState({ sections: data });
  //     },
  //     error: function(xhr, status, error) {
  //       alert('Cannot get data from API: ', error);
  //     }
  //   });
  // }

  handleFormSubmit(board, name, description, position){
    let body = {name: name, description:   description, position: position} 

    var self = this;
    $.ajax({
      url: '/board/'+ board.id + '/sections/new',
      data: { section: body },
      method: 'POST',
      success: function(data) {
        self.addNewSection(board, data)
      },
      error: function(xhr, status, error) {
        alert('Cannot create board at the moment. Please try later.: ', status, xhr, error);
      }
    });
  }

 //  addNewSection(board, section){
 //    this.setState({
 //      board: this.state.board.concat(section)
 //    })
 //  }

	handleEdit(id){
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
  render(){

		let name = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.section.name}/>:<h3>{this.props.section.name}</h3>
    let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.section.description}/>:<p>{this.props.section.description}</p>
    let position = this.state.editable ? <input type='text' ref={input => this.position = input} defaultValue={this.props.section.section_position}/>:<p>{this.props.section.section_position}</p>
    return(
      <div>
        {name}
        {description}
        {position}
        <NewTask board={this.props.board} handleFormSubmit={this.handleFormSubmit} />
        <AllTasks sections={this.state.sections} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} />
        <button onClick={() => this.handleAddSection(this.props.board.id)}> Add Taks</button>
        <button onClick={() => this.handleEdit()}> {this.state.editable? 'Submit' : 'Edit'}</button>
        <button onClick={() => this.props.handleDelete(this.props.board.id)}>Delete</button>
      </div>
    )      
  }
}