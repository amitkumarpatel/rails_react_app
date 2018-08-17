const AllSections = (props) => {
	var sections = props.sections.map((section) => {
    return(
      <div key={section.id}>
       <Section section={section}  handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}/>
      </div>
    )
  })

	return(
    <div>
      {sections}
    </div>
  )
}