import React from 'react';
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import { UserGlobalState } from '../Layout/UserGlobalState';
import "./seatReserve.css";
import Cookies from 'js-cookie';

export default function SeatReserve () {
    const { setBookingStep } = BookingStepGlobalState();
    const { currentUserData } = UserGlobalState();
    const classType = Cookies.get("classType");

    let prevPage = "loginAsk"
    if (currentUserData.username != null) { prevPage="flightSearch" };

    function handlePayNow() {
      setBookingStep('makePayment');
    }
    function handleBack() {
      setBookingStep(prevPage);
    }
    return (
      <>
        <div className='cen-box'>
          <div className="glass-background"></div>
          <div className="main-container">
            <div className='front-content front-text title'>
              Seat Reservations : {classType}
            </div>
            <div className='tbl-grp'>
              <div className='tbl-itm-1'>
                <div className='tbl-container'>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">1</button>
                    <button type="button" class="seat-btn btn">2</button>
                    <button type="button" class="seat-btn btn">3</button>
                    <button type="button" class="seat-btn btn">4</button>
                    <button type="button" class="seat-btn btn">5</button>
                    <button type="button" class="seat-btn btn">6</button>
                    <button type="button" class="seat-btn btn">7</button>
                    <button type="button" class="seat-btn btn">8</button>
                    <button type="button" class="seat-btn btn">9</button>
                    <button type="button" class="seat-btn btn">10</button>
                    <button type="button" class="seat-btn btn">11</button>
                    <button type="button" class="seat-btn btn">12</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">13</button>
                    <button type="button" class="seat-btn btn">14</button>
                    <button type="button" class="seat-btn btn">15</button>
                    <button type="button" class="seat-btn btn">16</button>
                    <button type="button" class="seat-btn btn">17</button>
                    <button type="button" class="seat-btn btn">18</button>
                    <button type="button" class="seat-btn btn">19</button>
                    <button type="button" class="seat-btn btn">20</button>
                    <button type="button" class="seat-btn btn">21</button>
                    <button type="button" class="seat-btn btn">22</button>
                    <button type="button" class="seat-btn btn">23</button>
                    <button type="button" class="seat-btn btn">24</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">25</button>
                    <button type="button" class="seat-btn btn">26</button>
                    <button type="button" class="seat-btn btn">27</button>
                    <button type="button" class="seat-btn btn">28</button>
                    <button type="button" class="seat-btn btn">29</button>
                    <button type="button" class="seat-btn btn">30</button>
                    <button type="button" class="seat-btn btn">31</button>
                    <button type="button" class="seat-btn btn">32</button>
                    <button type="button" class="seat-btn btn">33</button>
                    <button type="button" class="seat-btn btn">34</button>
                    <button type="button" class="seat-btn btn">35</button>
                    <button type="button" class="seat-btn btn">36</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">37</button>
                    <button type="button" class="seat-btn btn">38</button>
                    <button type="button" class="seat-btn btn">39</button>
                    <button type="button" class="seat-btn btn">40</button>
                    <button type="button" class="seat-btn btn">41</button>
                    <button type="button" class="seat-btn btn">42</button>
                    <button type="button" class="seat-btn btn">43</button>
                    <button type="button" class="seat-btn btn">44</button>
                    <button type="button" class="seat-btn btn">45</button>
                    <button type="button" class="seat-btn btn">46</button>
                    <button type="button" class="seat-btn btn">47</button>
                    <button type="button" class="seat-btn btn">48</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">49</button>
                    <button type="button" class="seat-btn btn">50</button>
                    <button type="button" class="seat-btn btn">51</button>
                    <button type="button" class="seat-btn btn">52</button>
                    <button type="button" class="seat-btn btn">53</button>
                    <button type="button" class="seat-btn btn">54</button>
                    <button type="button" class="seat-btn btn">55</button>
                    <button type="button" class="seat-btn btn">56</button>
                    <button type="button" class="seat-btn btn">57</button>
                    <button type="button" class="seat-btn btn">58</button>
                    <button type="button" class="seat-btn btn">59</button>
                    <button type="button" class="seat-btn btn">60</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">61</button>
                    <button type="button" class="seat-btn btn">62</button>
                    <button type="button" class="seat-btn btn">63</button>
                    <button type="button" class="seat-btn btn">64</button>
                    <button type="button" class="seat-btn btn">65</button>
                    <button type="button" class="seat-btn btn">66</button>
                    <button type="button" class="seat-btn btn">67</button>
                    <button type="button" class="seat-btn btn">68</button>
                    <button type="button" class="seat-btn btn">69</button>
                    <button type="button" class="seat-btn btn">70</button>
                    <button type="button" class="seat-btn btn">71</button>
                    <button type="button" class="seat-btn btn">72</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">73</button>
                    <button type="button" class="seat-btn btn">74</button>
                    <button type="button" class="seat-btn btn">75</button>
                    <button type="button" class="seat-btn btn">76</button>
                    <button type="button" class="seat-btn btn">77</button>
                    <button type="button" class="seat-btn btn">78</button>
                    <button type="button" class="seat-btn btn">79</button>
                    <button type="button" class="seat-btn btn">80</button>
                    <button type="button" class="seat-btn btn">81</button>
                    <button type="button" class="seat-btn btn">82</button>
                    <button type="button" class="seat-btn btn">83</button>
                    <button type="button" class="seat-btn btn">84</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">85</button>
                    <button type="button" class="seat-btn btn">86</button>
                    <button type="button" class="seat-btn btn">87</button>
                    <button type="button" class="seat-btn btn">88</button>
                    <button type="button" class="seat-btn btn">89</button>
                    <button type="button" class="seat-btn btn">90</button>
                    <button type="button" class="seat-btn btn">91</button>
                    <button type="button" class="seat-btn btn">92</button>
                    <button type="button" class="seat-btn btn">93</button>
                    <button type="button" class="seat-btn btn">94</button>
                    <button type="button" class="seat-btn btn">95</button>
                    <button type="button" class="seat-btn btn">96</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">97</button>
                    <button type="button" class="seat-btn btn">98</button>
                    <button type="button" class="seat-btn btn">99</button>
                    <button type="button" class="seat-btn btn">100</button>
                    <button type="button" class="seat-btn btn">101</button>
                    <button type="button" class="seat-btn btn">102</button>
                    <button type="button" class="seat-btn btn">103</button>
                    <button type="button" class="seat-btn btn">104</button>
                    <button type="button" class="seat-btn btn">105</button>
                    <button type="button" class="seat-btn btn">106</button>
                    <button type="button" class="seat-btn btn">107</button>
                    <button type="button" class="seat-btn btn">108</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">109</button>
                    <button type="button" class="seat-btn btn">110</button>
                    <button type="button" class="seat-btn btn">111</button>
                    <button type="button" class="seat-btn btn">112</button>
                    <button type="button" class="seat-btn btn">113</button>
                    <button type="button" class="seat-btn btn">114</button>
                    <button type="button" class="seat-btn btn">115</button>
                    <button type="button" class="seat-btn btn">116</button>
                    <button type="button" class="seat-btn btn">117</button>
                    <button type="button" class="seat-btn btn">118</button>
                    <button type="button" class="seat-btn btn">119</button>
                    <button type="button" class="seat-btn btn">120</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">121</button>
                    <button type="button" class="seat-btn btn">122</button>
                    <button type="button" class="seat-btn btn">123</button>
                    <button type="button" class="seat-btn btn">124</button>
                    <button type="button" class="seat-btn btn">125</button>
                    <button type="button" class="seat-btn btn">126</button>
                    <button type="button" class="seat-btn btn">127</button>
                    <button type="button" class="seat-btn btn">128</button>
                    <button type="button" class="seat-btn btn">129</button>
                    <button type="button" class="seat-btn btn">130</button>
                    <button type="button" class="seat-btn btn">131</button>
                    <button type="button" class="seat-btn btn">132</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">133</button>
                    <button type="button" class="seat-btn btn">134</button>
                    <button type="button" class="seat-btn btn">135</button>
                    <button type="button" class="seat-btn btn">136</button>
                    <button type="button" class="seat-btn btn">137</button>
                    <button type="button" class="seat-btn btn">138</button>
                    <button type="button" class="seat-btn btn">139</button>
                    <button type="button" class="seat-btn btn">140</button>
                    <button type="button" class="seat-btn btn">141</button>
                    <button type="button" class="seat-btn btn">142</button>
                    <button type="button" class="seat-btn btn">143</button>
                    <button type="button" class="seat-btn btn">144</button>
                  </div>
                  <div className='btn-row'>
                    <button type="button" class="seat-btn btn">145</button>
                    <button type="button" class="seat-btn btn">146</button>
                    <button type="button" class="seat-btn btn">147</button>
                    <button type="button" class="seat-btn btn">148</button>
                    <button type="button" class="seat-btn btn">149</button>
                    <button type="button" class="seat-btn btn">150</button>
                    <button type="button" class="seat-btn btn">151</button>
                    <button type="button" class="seat-btn btn">152</button>
                    <button type="button" class="seat-btn btn">153</button>
                    <button type="button" class="seat-btn btn">154</button>
                    <button type="button" class="seat-btn btn">155</button>
                    <button type="button" class="seat-btn btn">156</button>
                  </div>
                </div>
              </div>
              <div className='tbl-itm-2'>
                <form className='seat-data'>
                  <div class="form-group">
                    <label for="formGroupExampleInput">First Name</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="First Name"/>
                  </div>
                  <div class="form-group">
                    <label for="formGroupExampleInput2">Last Name</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Last Name"/>
                  </div>
                  <input type="checkbox" aria-label="Radio button for following text input"/>
                  <label for="formGroupExampleInput2"> &nbsp;Is Adult</label>
                  <div class="form-group">
                    <label for="formGroupExampleInput2">Passport ID</label>
                    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="Passport ID"/>
                  </div>
                  <div className="reserve-btn-set">
                    <button type="button" class="reserve-btn btn">Cancel</button>
                    <button type="button" class="reserve-btn btn">Reserve</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="btn-set">
              <button type="button" class="action-button btn">
                  <Link to="/home" style={{color:"white", textDecoration:"none"}}>
                    Cancel
                  </Link>
              </button>
              <button type="button" class="action-button btn" onClick={handleBack}>Back</button>
              <button type="button" class="action-button btn" onClick={handlePayNow}>Pay&nbsp;Now</button>
            </div>
          </div>
        </div>
      </>
    );
};

