import React from 'react'

const AddBookForm = (props) => {
  return(
    <form className="mybooks-form" id="frmAddBook">
      <div className="row">
        <div className="small-9 large-6 small-centered columns">
          <label>Title:
            <input id="title" type="text" placeholder="Book Title" required />
            <span className="form-error">Book Title required!</span>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="small-9 large-6 small-centered columns">
          <label>Author Last Name:
            <input id="author-last" type="text" placeholder="Author last name" required />
            <span className="form-error">Author required!</span>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="small-9 large-6 small-centered columns">
          <label>Author First Name:
            <input id="author-first" type="text" placeholder="Author first name" />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="small-9 large-6 small-centered columns">
          <label>Genre:
            <input id="genre" type="text" placeholder="Historical fiction" />
          </label>
        </div>
      </div>
      <div className="small-9 large-6 small-centered columns">
        <div className="alert callout hide" data-toggler=".hide" id="searchErrorCallout">
          <h5 id="errHeader"></h5>
          <p id="errMessage"></p>
          <button className="close-button" aria-label="Dismiss alert" type="button" id="errClose" data-toggle="searchErrorCallout">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="success callout hide" data-toggler=".hide" id="addSuccessCallout">
          <h5 id="successHeader"></h5>
          <p id="successMessage"></p>
          <button className="close-button" aria-label="Dismiss alert" type="button" id="successClose" data-toggle="addSuccessCallout">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="small-9 large-6 small-centered columns clearfix">
          <input type="submit" className="button" onClick={props.submit} value="Add Book" />
          <input type="reset" className="button warning float-right" value="Cancel" data-toggle="panel"/>
        </div>
      </div>
    </form>
  )
}

export default AddBookForm
