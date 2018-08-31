class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boards: [], board: false };
    this.showNewForm = this.showNewForm.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewBoard = this.addNewBoard.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteBoard = this.deleteBoard.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateBoard = this.updateBoard.bind(this)
    this.listSections = this.listSections.bind(this)
  }
  
  componentDidMount(){
    var self = this;
    $.ajax({
      url: '/boards',
      success: function(data) {
        self.setState({ boards: data });
        self.setState({ board: data[0] });
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

  showNewForm() {
    $('.new-board-form').toggleClass("display-none");
  }

  listSections(id){
    var self = this;
    $.ajax({
      url: '/boards/' + id,
      success: function(data) {
        self.setState({ board: data });
        console.log(self);
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  }

// renderSections(data) {
//       currentBoard = data
// console.log(this.state);
// }

  render(){
    let board_names = this.state.boards.map((board) => {
      return(
        <a href="javascript:void(0)" key={board.id}  className="list-group-item" onClick={() => this.listSections(board.id)}>
          {board.name}
        </a> 
      )
    })

     let currentBoard ;
     if (this.state.board) {
       currentBoard = <Board board={this.state.board}  handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
     }
    return(

      <div className="row">
        <div className="col-lg-3">
          <h1 className="my-4">Board Names</h1>
          <div className="list-group">
            {board_names}
          </div>
          <div>
            <a href="javascript:void(0)" className="list-group-item" onClick={this.showNewForm}>New Board</a>
          </div>
        </div>
        <div className="col-lg-9">
          <div className='display-none new-board-form'>
            <NewBoard handleFormSubmit={this.handleFormSubmit} />
          </div>
          <div className="my-4">
            {currentBoard}
            {/*<AllBoards boards={this.state.boards} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} /> */}
            <div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}