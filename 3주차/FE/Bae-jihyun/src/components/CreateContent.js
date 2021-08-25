import React, { Component } from 'react';

class CreateContent extends Component{
    render(){
      return (
        <article>
          <h2>Create</h2>
          <form action ="/create_process" method="post"
            onSubmit={function(e){  //submit 버튼 눌리면 실행됨.
              e.preventDefault();
              this.props.onSubmit(   //app.js의 onSubmit 함수로 인수전달
                e.target.title.value, //e.target = form tag를 말하는 것.
                e.target.desc.value
              );
            }.bind(this)}
          >
            <p> <input type ="text" name ="title" placeholder="title"></input></p>
            <p><textarea name="desc" placeholder="description"></textarea></p>
            <p><input type ="submit"></input></p>
           </form>
        </article>
      );
    }
  }
  
export default CreateContent;