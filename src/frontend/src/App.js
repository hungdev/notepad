import React, { Component } from 'react'
import randomize from 'randomatic'
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import * as Showdown from "showdown";
import * as Api from './services/Api'
import { Input, Modal, Button, Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import { PassModal } from './components'
import { UnlockFilled, LockFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      tab: "write",
      properties: {},
      pass: ''
    }
  }

  componentDidMount() {
    if (!window.location.pathname.replace('/', '')) {
      const randFileName = randomize('a', 4)
      window.location.href = `${window.location.origin}/${randFileName}`;
    }

    this.getWord()
  }

  async getWord() {
    const fileName = window.location.pathname.replace('/', '')
    const { pass } = this.state
    try {
      const result = await Api.getWord({ fileName, pass })
      this.setState({
        value: result.data.content,
        properties: result.data,
        visible: result.data.locked && !result.data.edit,
        status: result.data.status,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async writeWord() {
    const fileName = window.location.pathname.replace('/', '')
    const { pass, value } = this.state
    try {
      const data = {
        fileName,
        pass,
        "content": value,
      }
      const result = await Api.writeWord(data)
    } catch (error) {
      console.log(error)
    }
  }

  async setPass() {
    const fileName = window.location.pathname.replace('/', '')
    const { pass, value } = this.state
    try {
      const result = await Api.setPass({ fileName, pass })
    } catch (error) {
      console.log(error)
    }
  }



  handleValueChange(value) {
    this.setState({ value }, () => this.writeWord());
  };

  handleTabChange = (tab) => {
    this.setState({ tab });
  };

  handleOk = (pass) => {
    const { isSetPass } = this.state
    this.setState({ pass }, () => {
      if (isSetPass) {
        this.setPass()
        this.setState({ visible: false })
      } else {
        this.getWord()
      }
    })

  }

  onUnlock = () => {
    this.setState({ visible: true })
  }


  onLock = () => {
    this.setState({ visible: true, isSetPass: true })

  }

  render() {
    const { value, tab, properties, visible, status } = this.state
    return (
      <Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
          <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = window.location.origin}>
              <img
                src={require("./assets/notepad.png")}
                alt="notepad"
                style={{ height: 50 }}
              />
            </div>
            <div>
              {!properties.edit &&
                <UnlockFilled
                  style={{ fontSize: '25px', color: '#08c', cursor: 'pointer', marginRight: 20 }}
                  onClick={this.onUnlock}
                />}
              {properties.edit &&
                <LockFilled style={{ fontSize: '25px', color: '#08c', cursor: 'pointer' }}
                  onClick={this.onLock} />}
            </div>
          </div>
          <div className="site-layout-content">
            <TextArea
              onChange={e => this.handleValueChange(e.target.value)}
              value={value}
              style={{ height: '90%' }}
              disabled={!properties.edit}
            // rows={4}
            />
          </div>
          <PassModal
            visible={visible}
            onOk={this.handleOk}
            onCancel={(x) => this.setState({ visible: false })}
            status={status}
            disClose={!properties.edit}
          />
        </Content>
        <Footer style={{ textAlign: 'center', }}>Notepad ©2020 Created by <a href='http://hungvu.net/' style={{ color: 'red' }}>Cee</a></Footer>
      </Layout>
    )
  }
}

export default App
