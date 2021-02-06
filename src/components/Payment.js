import React, { Component } from 'react'
import eth from '../eth-logo.png';
import token1 from '../tether.png';
import token2 from '../dai.png';



class Payment extends Component {

  render() {
    return (
      <div dir="rtl" id="content" className="mt-3">
      
        <p>درگاه پرداخت هوشمند اتریوم</p>

        <div className="card mb-4">
        <div className="card-body">
        <form className="mb-3" ref={form1 => this.form1 = form1} onSubmit={(event) => {
                event.preventDefault()
                let uint
                uint = this.input3.value
                let weiAmount = this.props.web3.utils.toWei(uint,'ether')
                const {currency1} = this.form1;
                let address = currency1.value           
                this.props.deposit(weiAmount,address)
              }}>
              <div>
                <label className="float-left"><b>پرداخت به درگاه</b></label>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input3) => { this.input3 = input3 }}
                  className="form-control form-control-lg"
                  placeholder="مقدار"
                  required />
                   </div>
                <div className="input-group mb-4">
                  <label>
                  <div className="input-group-text">
                    <img src={eth} height='32' width='32' alt=""/>&nbsp;&nbsp;
                    اتر &nbsp;
                    <input type="radio" readOnly value="0x0000000000000000000000000000000000000000" name="currency1"  checked= {true} />
                    </div>
                  </label>
                </div>
                <div className="input-group mb-4">
                  <label>
                  <div className="input-group-text">
                  <img src={token1} height='32' width='32' alt=""/>&nbsp;&nbsp;
                    تتر &nbsp;
                    <input type="radio" readOnly value="0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02" name="currency1" />
                    </div>
                  </label>
                </div>
                <div className="input-group mb-4">
                 <label>
                 <div className="input-group-text">
                 <img src={token2} height='32' width='32' alt=""/>&nbsp;
                   دای &nbsp;
                    <input type="radio" readOnly value="0xc7ad46e0b8a400bb3c915120d284aafba8fc4735" name="currency1" />
                    </div>
                 </label>
                </div>
              
              <button type="submit" className="btn btn-primary btn-block btn-lg">پرداخت کن</button>
            </form>
        </div>
        </div>


        <div className="card mb-4">
        <div className="card-body">
        <form className="mb-3" ref={form2 => this.form2 = form2} onSubmit={(event) => {
                event.preventDefault()
                let uint
                uint = this.input4.value
                let weiAmount = this.props.web3.utils.toWei(uint,'ether')
                const {currency2} = this.form2;
                let address = currency2.value           
                this.props.buy(weiAmount,address)
              }}>
              <div>
                <label className="float-left"><b>پرداخت مستقیم</b></label>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input4) => { this.input4 = input4 }}
                  className="form-control form-control-lg"
                  placeholder="مقدار"
                  required />
                   </div>
                <div className="input-group mb-4">
                  <label>
                  <div className="input-group-text">
                    <img src={eth} height='32' width='32' alt=""/>&nbsp;&nbsp;
                    اتر &nbsp;
                    <input type="radio" readOnly value="0x0000000000000000000000000000000000000000" name="currency2"  checked= {true} />
                    </div>
                  </label>
                </div>
                <div className="input-group mb-4">
                  <label>
                  <div className="input-group-text">
                  <img src={token1} height='32' width='32' alt=""/>&nbsp;&nbsp;
                      تتر &nbsp;
                    <input type="radio" readOnly value="0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02" name="currency2" />
                    </div>
                  </label>
                </div>
                <div className="input-group mb-4">
                 <label>
                 <div className="input-group-text">
                 <img src={token2} height='32' width='32' alt=""/>&nbsp;
                     دای &nbsp;
                    <input type="radio" readOnly value="0xc7ad46e0b8a400bb3c915120d284aafba8fc4735" name="currency2" />
                    </div>
                 </label>
                </div>
              
              <button type="submit" className="btn btn-primary btn-block btn-lg">پرداخت کن</button>
            </form>
        </div>
        </div>


      </div>
    );
  }
}

export default Payment;
