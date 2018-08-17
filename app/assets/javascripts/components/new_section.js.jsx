const NewSection = (props) => {
  let formFields = {}
 
  return(
    <div>
     <input ref={input => formFields.name = input} placeholder='Enter the name of the item'/>
     <input ref={input => formFields.description = input} placeholder='Enter Description' />
     <input ref={input => formFields.position = input} placeholder='Enter position' />
     <button onClick={ () => props.handleFormSubmit(props.board, formFields.name.value, formFields.description.value, formFields.position.value)}>Submit</button>
      </div>
    )
}