const NewTask = (props) => {

  let formFields = {}
   var inputPropsStartDate = {
      name: 'start_date',
      type: 'text',
      placeholder: 'Enter Start Date',
      input: {true},
      open: {false}
   };
   var inputPropsEndDate = {
      name: 'end_date',
      type: 'text',
      placeholder: 'Enter End Date',
      input: {true},
      open: {false}
   };
  return(
    <div>  
      <div>New Task Form</div>
      <div>
        <input type="text" name="title" ref={input => formFields.title = input} placeholder='Enter name of the item' className='form-control'/>
        <textarea name="description" ref={input => formFields.description = input} placeholder='Enter Description' className='form-control'/>
        <input type="text" name="position" ref={input => formFields.position = input} placeholder='Enter position' className='form-control'/>
        <Datetime dateFormat='YYYY-MM-DD' timeFormat={false} inputProps={inputPropsStartDate} ref={input => formFields.start_date = input} />
        {/*<Datetime input={true} open={false} ref={input => formFields.end_date = input}
         onChange={this.setApptTime}  placeholder='Enter End Date'/>*/}
        <Datetime dateFormat='YYYY-MM-DD' timeFormat={false} inputProps={inputPropsEndDate} ref={input => formFields.end_date = input}/>
        <button onClick={ () => props.handleFormSubmit(props.section, formFields.title.value, formFields.description.value, formFields.position.value, formFields.start_date.state.inputValue, formFields.end_date.state.inputValue)}>Submit</button>
      </div>
    </div>
  )
}