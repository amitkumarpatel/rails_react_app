const AllTasks = (props) => {
  if (props.tasks.length > 0){
    var tasks = props.tasks.map((task) => {
      return(
        <div key={task.id}>
         <Task task={task}  handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}/>
        </div>
      )
    })
  }else{
    var tasks =  []
  }

	return(
    <div>
      {tasks}
    </div>
  )
}