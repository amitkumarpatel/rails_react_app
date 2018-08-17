class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boards: [] };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewBoard = this.addNewBoard.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteBoard = this.deleteBoard.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateBoard = this.updateBoard.bind(this)
  }
  componentDidMount(){
    var self = this;
    $.ajax({
      url: '/boards',
      success: function(data) {
        self.setState({ boards: data });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  }
  handleFormSubmit(name, description){
    let body = {name: name, description:   description} 

    var self = this;
    $.ajax({
      url: '/boards',
      data: { board: body },
      method: 'POST',
      success: function(data) {
        self.addNewBoard(data)
      },
      error: function(xhr, status, error) {
        alert('Cannot create board at the moment. Please try later.: ', status, xhr, error);
      }
    });
  }

  handleDelete(id){
    $.ajax({
      method: 'DELETE',
      url: '/boards/' + id,
      success: function(data) {
        this.deleteBoard(id)
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot delete requested record: ', error);
      }
    });
  }

  addNewBoard(board){
    this.setState({
      boards: this.state.boards.concat(board)
    })
  }

  deleteBoard(id){
    newBoards = this.state.boards.filter((board) => board.id !== id)
    this.setState({
      boards: newBoards
    })
  }

  handleUpdate(board){
    $.ajax({
      method: 'PUT',
      url: '/boards/' + board.id,
      data: { board: board },
      success: function(data) {
        this.updateBoard(board)
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot update requested record: ', error);
      }
    });  
  }

  updateBoard(board){
    let newBoards = this.state.boards.filter((f) => f.id !== board.id)
    newBoards.push(board)
    this.setState({
      boards: newBoards
    })
  }

  render(){
    return(
      <div>
        <NewBoard handleFormSubmit={this.handleFormSubmit} />
        <AllBoards boards={this.state.boards} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} />
      </div>
    )
  }
}