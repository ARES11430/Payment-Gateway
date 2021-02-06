import React, { Component } from 'react'
import eth from '../eth-logo.png';
import token1 from '../tether.png';
import token2 from '../dai.png';



class Panel extends Component {

  render() {
    return (
      <div id="content" dir="rtl" lang="fa" className="mt-3">
      
        <p dir="rtl" >پنل مدیریتی درگاه</p>
        <div dir="rtl">
          <p>{this.props.currentOwner} آدرس مالک درگاه</p>
          <p>{this.props.wallet} آدرس کیف پول</p> 
          <p>{this.props.web3.utils.fromWei(this.props.balanceOfEther,'ether')} موجودی اتر درگاه</p>   
          <p>{this.props.balanceOfToken1} موجودی توکن تتر درگاه</p> 
          <p>{this.props.balanceOfToken2} موجودی توکن دای درگاه</p> 
        </div>
        
        <div dir="rtl" className="card mb-4">
          <div dir="rtl" className="card-body">
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let newOwner 
                newOwner = this.input1.value          
                this.props.transferOwnership(newOwner)
              }}>
              <div dir="rtl">
                <label className="float-left"><b>انتقال مالکیت</b></label>
              </div>
              <div dir="rtl" className="input-group mb-4">
                <input
                  type="text"
                  ref={(input1) => { this.input1 = input1 }}
                  className="form-control form-control-lg"
                  placeholder="آدرس مالک جدید"
                  required />                            
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">انتقال</button>
            </form>

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let address 
                address = this.input2.value           
                this.props.changeWallet(address)
              }}>
              <div dir="rtl">
                <label className="float-left"><b>تغییر کیف پول</b></label>
              </div>
              <div dir="rtl" className="input-group mb-4">
                <input
                  type="text"
                  ref={(input2) => { this.input2 = input2 }}
                  className="form-control form-control-lg"
                  placeholder="آدرس کیف پول جدید"
                  required />                            
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">تعویض</button>
            </form>           
          </div>
        </div>

        <div className="card mb-4">
        <div className="card-body">
        <form className="mb-3" ref={form3 => this.form3 = form3} onSubmit={(event) => {
                event.preventDefault()
                let uint
                uint = this.input5.value
                let weiAmount = this.props.web3.utils.toWei(uint,'ether')
                const {currency3} = this.form3;
                let address = currency3.value           
                this.props.withdraw(weiAmount,address)
              }}>
              <div>
                <label className="float-left"><b>برداشت از درگاه</b></label>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input5) => { this.input5 = input5 }}
                  className="form-control form-control-lg"
                  placeholder="مقدار"
                  required />
                   </div>
                <div className="input-group mb-4">
                  <label>
                  <div className="input-group-text">
                    <img src={eth} height='32' width='32' alt=""/>&nbsp;&nbsp;
                    اتر &nbsp;
                    <input type="radio" readOnly value="0x0000000000000000000000000000000000000000" name="currency3"  checked= {true} />
                    </div>
                  </label>
                </div>
                <div className="input-group mb-4">
                  <label>
                  <div className="input-group-text">
                  <img src={token1} height='32' width='32' alt=""/>&nbsp;&nbsp;
                     تتر &nbsp;
                    <input type="radio" readOnly value="0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02" name="currency3" />
                    </div>
                  </label>
                </div>
                <div className="input-group mb-4">
                 <label>
                 <div className="input-group-text">
                 <img src={token2} height='32' width='32' alt=""/>&nbsp;
                     دای &nbsp;
                    <input type="radio" readOnly value="0xc7ad46e0b8a400bb3c915120d284aafba8fc4735" name="currency3" />
                    </div>
                 </label>
                </div>
              
              <button type="submit" className="btn btn-primary btn-block btn-lg">برداشت</button>
            </form>
        </div>
        </div>

        <div className="card mb-4">
        <div className="card-body">
        <form className="mb-3" ref={form4 => this.form4 = form4} onSubmit={(event) => {
                event.preventDefault()
                let uint
                uint = this.input6.value
                let weiAmount = this.props.web3.utils.toWei(uint,'ether')
                const {currency4} = this.form4;
                let currency = currency4.value  
                let recepient = this.input7.value        
                this.props.transferTo(recepient,weiAmount,currency)
              }}>
              <div>
                <label className="float-left"><b>انتقال به کیف پول مورد نظر</b></label>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input6) => { this.input6 = input6 }}
                  className="form-control form-control-lg"
                  placeholder="مقدار"
                  required />
                   </div>
                   <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input7) => { this.input7 = input7 }}
                  className="form-control form-control-lg"
                  placeholder="آدرس کیف پول گیرنده"
                  required />
                   </div>
                <div className="input-group mb-4">
                  <label>
                  <div className="input-group-text">
                    <img src={eth} height='32' width='32' alt=""/>&nbsp;&nbsp;
                    اتر &nbsp;
                    <input type="radio" readOnly value="0x0000000000000000000000000000000000000000" name="currency4"  checked= {true} />
                    </div>
                  </label>
                </div>
                <div className="input-group mb-4">
                  <label>
                  <div className="input-group-text">
                  <img src={token1} height='32' width='32' alt=""/>&nbsp;&nbsp;
                     تتر &nbsp;
                    <input type="radio" readOnly value="0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02" name="currency4" />
                    </div>
                  </label>
                </div>
                <div className="input-group mb-4">
                 <label>
                 <div className="input-group-text">
                 <img src={token2} height='32' width='32' alt=""/>&nbsp;
                    دای &nbsp;
                    <input type="radio" readOnly value="0xc7ad46e0b8a400bb3c915120d284aafba8fc4735" name="currency4" />
                    </div>
                 </label>
                </div>
              
              <button type="submit" className="btn btn-primary btn-block btn-lg">انتقال</button>
            </form>
            </div>
            </div>

      </div>
    );
  }
}

export default Panel;
