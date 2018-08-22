const NewTask = (props) => {
  let formFields = {}
 
  return(
    <div>  
      <div>New Task Form</div>
      <div>
        <input ref={input => formFields.title = input} placeholder='Enter the name of the item'/>
        <input ref={input => formFields.description = input} placeholder='Enter Description' />
        <input ref={input => formFields.position = input} placeholder='Enter position' />
        <input ref={input => formFields.start_date = input} placeholder='Enter Start Date' />
        <input ref={input => formFields.end_date = input} placeholder='Enter End Date' />
        <button onClick={ () => props.handleFormSubmit(props.section, formFields.title.value, formFields.description.value, formFields.position.value, formFields.start_date.value, formFields.end_date.value)}>Submit</button>
      </div>
    </div>
  )
}