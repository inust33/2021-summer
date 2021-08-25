import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Control from "./components/Control";
import "./App.css";
import React, { Component, createContext } from "react";

class Subject extends Component {
  // Subject라는 tag생성
  render() {
    // class 안에 있는 함수는 function생략
    return (
      <header>
        {" "}
        {/* component를 만들 때 최상위 태그 꼭 있어야함 */}
        <h1>
          {" "}
          <a href="/">{this.props.title}</a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}

class App extends Component {
  constructor(props) {
    // 초기화
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "create",
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello React!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information..." },
        { id: 2, title: "CSS", desc: "CSS is for design..." },
        {
          id: 3,
          title: "JavaScript",
          desc: "JavaScript is for interactive...",
        },
      ],
    };
  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            // this.state.contents.push(
            //   {id:this.max_content_id, title:_title,desc:_desc}
            // );   push보다는 concat사용 (concat은 새로운 객체를 만드는것, push는 원본 데이터를 바꾸는 것.)
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            });
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents); //복제
            var i = 0; //contents들 중에 내가 수정할 content의 id와 같은 것 찾기
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc }; //데이터 바꿔치기
                break;
              }
              i = i + 1;
            }
            this.setState({
              contents: _contents,
              mode: "read",
            });
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></Subject>

        {/* 
        <header>                       // component를 만들 때 최상위 태그 꼭 있어야함
        <h1> <a href="/" onClick ={function(e){
          console.log(e);
          e.preventDefault();
          this.setState({
            mode:'welcome'
          });
        }.bind(this)}>{this.state.subject.title}</a></h1>
        {this.state.subject.sub}
      </header> 
      */}

        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>

        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              //반환할 article이 없으니 getContent()에 없고 여기서 실행
              if (window.confirm("really?")) {
                var _contents = Array.from(this.state.contents);
                var i = 0; //삭제할 content 찾기
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1); //어디서부터 어디까지 지울 것인가?
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents, //복제해서 삭제까지 한 contents들을 원본 data로 바꿔줌
                });
                alert("deleted!"); //삭제되었음을 창띄워줌
              }
            } else {
              //create, update, read일 때
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Control>

        {this.getContent()}
      </div>
    );
  }
}

export default App;
