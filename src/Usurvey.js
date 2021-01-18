import React,{Component} from 'react';
import firebase from "firebase";
// var firebase = require('firebase/app');

var uuid = require('uuid');

var firebaseConfig = {
  apiKey: "AIzaSyAzuxJAbKtj8DWEjn58JFkTUWjeLuChJRw",
  authDomain: "usurvey-2db5b.firebaseapp.com",
  projectId: "usurvey-2db5b",
  storageBucket: "usurvey-2db5b.appspot.com",
  messagingSenderId: "79636409718",
  appId: "1:79636409718:web:fa81edd053cd6d39191e57",
  measurementId: "G-LYWS6WD5ZD"
};
  firebase.initializeApp(firebaseConfig);


  class Usurvey extends Component {
    nameSubmit(e){
         e.preventDefault();
     this.setState({ studentName: this.textInput.value}, function(){
        console.log(this.state);
      });
    }
    answerSelected(event){

      var answers = this.state.answers;
      if(event.target.name === 'answer1'){
        answers.answer1 = event.target.value;
      } else if(event.target.name === 'answer2'){
        answers.answer2 = event.target.value;
      } else if(event.target.name === 'answer3'){
        answers.answer3 = event.target.value;
      }

      this.setState({answers: answers}, function(){
        console.log(this.state);
      });
    }

    questionSubmit(event){
        event.preventDefault();
      firebase.database().ref(`Usurvey/${this.state.uid}`).set({
        studentName: this.state.studentName,
        answers: this.state.answers
      });
      this.setState({isSubmitted: true});
    }

    constructor(props){
      super(props);

      this.state = {
        uid: uuid.v1(),
        studentName: '',
        answers: {
          answer1: '',
          answer2: '',
          answer3: ''
        },
        isSubmitted: false
      };

      this.nameSubmit = this.nameSubmit.bind(this);
      this.answerSelected = this.answerSelected.bind(this);
      this.questionSubmit = this.questionSubmit.bind(this);
    }

    render(){
      var studentName;
      var questions;

      if(this.state.studentName === '' && this.state.isSubmitted === false){
        studentName = <div>
          <h1>Hey Student, please let us know your name: </h1>
          <form onSubmit={this.nameSubmit}>
            <input className="namy" type="text" placeholder="Enter your name" ref={e => this.textInput = e} />
          </form>
        </div>;
        questions = ''
      } else if (this.state.studentName !== '' && this.state.isSubmitted === false){
        studentName = <h1>Welcome to U-Survey, {this.state.studentName}</h1>;
          questions = <div>
            <h2>Here are some questions: </h2>
            <form onSubmit={this.questionSubmit}>
              <div className="card">
                <label>What kind of courses you like the most: </label> <br />
                <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Technology
                <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
                <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} />Marketing
              </div>
              <div className="card">
                <label>you are a: </label> <br />
                <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} />Student
                <input type="radio" name="answer2" value="in-job" onChange={this.answerSelected} />in-job
                <input type="radio" name="answer2" value="looking-job" onChange={this.answerSelected} />looking-job
              </div>
              <div className="card">
                <label>Is online learning helpful:  </label> <br />
                <input type="radio" name="answer3" value="yes" onChange={this.answerSelected} />yes
                <input type="radio" name="answer3" value="no" onChange={this.answerSelected} />no
                <input type="radio" name="answer3" value="maybe" onChange={this.answerSelected} />maybe
              </div>
              <input className="feedback-button" type="submit" value="submit" />
            </form>
          </div>
      } else if(this.state.isSubmitted === true && this.state.studentName!==''){
        studentName = <h1>Thanks, {this.state.studentName}</h1>
      }

      return(
        <div>
          {studentName}
          --------------------------------
          {questions}
        </div>
      );
    }
  }

  export default Usurvey;
