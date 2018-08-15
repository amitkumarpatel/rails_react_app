const AllBoards = (props) => {
	var boards = props.boards.map((board) => {
    return(
      <div key={board.id}>
       <Board board={board}  handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}/>
      </div>
    )
  })

	return(
    <div>
      {boards}
    </div>
  )
}