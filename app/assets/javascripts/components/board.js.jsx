class Board extends React.Component{

constructor(props){
    super(props);
    this.state = { editable: false }
    this.handleEdit = this.handleEdit.bind(this)
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


  render(){

		let name = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.board.name}/>:<h3>{this.props.board.name}</h3>
    let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.board.description}/>:<p>{this.props.board.description}</p>

    return(
      <div>
        {name}
        {description}
        <button onClick={() => this.handleEdit()}> {this.state.editable? 'Submit' : 'Edit'}</button>
        <button onClick={() => this.props.handleDelete(this.props.board.id)}>Delete</button>
      </div>
    )      
  }
}