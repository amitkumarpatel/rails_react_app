const AllSections = (props) => {
	var sections = props.sections.map((section) => {
    return(
      <div className="col-lg-4 col-md-6 mb-4"  key={section.id}>
       <Section section={section}  handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}/>
      </div>
    )
  })

	return(
    <div className='row'>
      {sections}
    </div>
  )
}