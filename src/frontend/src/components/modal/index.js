import React, { Component } from 'react'
import { Input, Modal, Button } from 'antd';

class PassModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      value: ''
    }
  }

  onOk = () => {
    const { onOk } = this.props
    const { value } = this.state
    if (onOk) onOk(value)
    this.setState({ value: '' })
  }

  render() {
    const { value } = this.state
    const { onOk, handleCancel, visible, status, onCancel, disClose } = this.props
    return (
      <div>
        <Modal
          title="Input password"
          visible={visible}
          onOk={this.onOk}
          onCancel={() => !disClose && onCancel()}
          cancelText='Go back to Notepad'
          closeIcon={!disClose ? false : <div></div>}
          footer={[
            <Button key="back" onClick={() => window.location.href = window.location.origin}>
              Create new notepad
            </Button>,
            <Button key="submit" type="primary" onClick={this.onOk}>
              Submit
            </Button>,
          ]}
        >
          <div>
            <Input
              value={value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
            <div style={{ color: 'red', marginTop: 10 }}>{status}</div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default PassModal


