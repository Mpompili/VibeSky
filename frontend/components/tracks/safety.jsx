import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      uploader_id: this.props.currentUser.id,
      imageFile: null,
      imageUrl: null,
      audioFile: null,
      audioUrl: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  update(type) {
    console.log(this.state);
    return e => this.setState({ [type]: e.currentTarget.value })
  }

  updateFile(type, e) {
    const typeFile = type.concat('File');
    const typeUrl = type.concat('Url');
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      debugger
      return this.setState({ [typeFile]: file, [typeUrl]: fileReader.result });
    }
    file ? fileReader.readAsDataURL(file) :
      this.setState({ [typeUrl]: 'didnt work', [typeFile]: null })
  }


  handleSubmit(type, e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);
    if (type === 'create') {
      if (this.state.audioFile) formData.append("track[audio]", this.state.audioFile);
    };
    if (this.state.imageFile) formData.append("track[image]", this.state.imageFile);

    this.props.createTrack(formData).then(() => this.props.history.replace('/tracks'));
  }

  generalDetailForm() {
    let type = this.props.match.path ///////////PATH PATH APT

    return (
    <div className="detail-submit">
      <div className='ds-image-box'>
        <img src={this.state.imageUrl}/>
        <label className='imageLabel'>Upload Image
          <input className="h-input" type="file" onChange={(e) => this.updateFile('image', e)}/>
        </label>
      </div>

      <div className='track-detail-form'>
        <p className='tdf-text tdf-required'>Title</p>
        <input className='txt-input'type="text" onChange={this.update('title')} value={this.state.title}/>
        <p className='tdf-text'>Description</p>
        <textarea className='txt-input txta active-ring' onChange={this.update('description')} value={this.state.description}></textarea>
        <input className="inputLabel" type="submit" value='Upload Track' />
      </div>
    </div>);
  }

  render(){

  let detailSubmit, upload_container;

  if (this.state.audioFile === null) {
    upload_container = 'audio-upload-container';
    detailSubmit = '';
  } else {
    upload_container = 'audio-upload-container auc-special';
    detailSubmit = this.generalDetailForm();
  }

    return (
      <div className='track-form-container'>
        <form onSubmit={(e) => this.handleSubmit(type, e)} className='track-form'>
          <div className={upload_container}>
            <h1>Upload to VIBESKY</h1>
            <label className='inputLabel il-main active-ring'>Choose a file to upload
              <input className="h-input" type="file" onChange={(e) => this.updateFile('audio', e)}/>
            </label>
          </div>
          <TrackDetailFrom />
          {detailSubmit}
        </form>
      </div>
    )
  }
}

export default TrackForm;
