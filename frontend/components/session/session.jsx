import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(document.getElementById('header-carousel'));

class sessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      modalIsOpen: true,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    console.log(this.props);
  }

  openModal() {
     this.setState({modalIsOpen: true});
   }

   afterOpenModal() {
     // references are now sync'd and can be accessed.
   }

   closeModal() {
     this.setState({modalIsOpen: false});
     this.props.history.push("/");
   }

  update(field){
    return e => this.setState({ [field]: e.currentTarget.value })
  }

  handleSubmit(e){
    e.preventDefault();
    let user = Object.assign({},
      {email: this.state.email, password: this.state.password});
    this.props.submitForm(user);
  }

  render(){
    let { path, submitForm  } = this.props
    let message;
    message = path === 'signup' ?
      'Create your VIBESKY account' : 'Log in';

    return(
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}
         contentLabel="Example Modal"
       >
        <form onSubmit={this.handleSubmit} className="session-form-box">
          <h1>{ message }</h1><br/>
            <input
              type="text"
              value={this.state.email}
              placeholder="Your email address"
              onChange={this.update('email')}
              className="session-input"
              />
          <br/>
            <input
              type="password"
              value={this.state.password}
              placeholder="Your Password"
              onChange={this.update('password')}
              className="session-input"
              />
            <br/>
          <input className="session-submit" type="submit" value='Continue' />
          <br/><br/>
          <p className="session-text">We may use your email for updates and tips on SoundCloud's
            products and services. You can unsubscribe for free at any time
            in your notification preferences.</p>
          <p className="session-text stcenter">By signing in, you agree to our
            <a target="_blank" href="www.google.com"> Terms of Use</a>
          </p>
        </form>
      </Modal>
      </div>
    )
  }
}

export default sessionForm;
