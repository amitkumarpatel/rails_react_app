class Board extends React.Component{

constructor(props){
    super(props);
    this.state = { sections: [], editable: false }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewSection = this.addNewSection.bind(this)
    this.handleAddSection = this.handleAddSection.bind(this)
    this.updateBoardSection = this.updateBoardSection.bind(this)
  }  

  componentDidMount(){
    console.log(this);
    var self = this;
    $.ajax({
      url: '/boards/' + this.props.board.id + '/sections',
      success: function(data) {
        self.setState({ sections: data });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  }

  handleFormSubmit(board, name, description, position){
    let body = {name: name, description:   description, section_position: position} 

    var self = this;
    $.ajax({
      url: '/boards/'+ board.id + '/sections',
      data: { section: body },
      method: 'POST',
      success: function(data) {
        self.addNewSection(board, data)
      },
      error: function(xhr, status, error) {
        alert('Cannot create section for this board at the moment. Please try later.: ', status, xhr, error);
      }
    });
  }

  addNewSection(board, section){
    this.setState({
      sections: this.state.sections.concat(section)
    })
  }

	handleEdit(){
		if(this.state.editable){
      let name = this.name.value
      let description = this.description.value
      let id = this.props.board.id
      let board = {id: id, name: name, description: description}
      this.props.handleUpdate(board)
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  handleAddSection(id){
    $.ajax({
      method: 'POST',
      url: '/boards/' + id + '/sections',
      //data: { board: board },
      success: function(data) {
        this.updateBoardSection(board)
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot update requested record: ', error);
      }
    });  
  }
  updateBoardSection(board, section){
    let newSections = board.filter((f) => f.id !== board.id)
    newBoards.push(board)
    this.setState({
      boards: newBoards
    })
  }
  render(){

		let name = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.board.name}/>:<h3>{this.props.board.name}</h3>
    let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.board.description}/>:<p>{this.props.board.description}</p>
    return(
      <div>
        {name}
        {description}
        <NewSection board={this.props.board} handleFormSubmit={this.handleFormSubmit} />
        <AllSections sections={this.state.sections} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} />
        <button onClick={() => this.handleAddSection(this.props.board.id)}> Add Section</button>
        <button onClick={() => this.handleEdit()}> {this.state.editable? 'Submit' : 'Edit'}</button>
        <button onClick={() => this.props.handleDelete(this.props.board.id)}>Delete</button>
      </div>
    )      
  }
}