import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { UserGlobalState } from "../Layout/UserGlobalState";
import axios from "axios";
import "./seatReserve.css";

export default function SeatReserve() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const { setBookingStep } = BookingStepGlobalState();
  const { currentUserData } = UserGlobalState();
  const { bookingProcessDetails, setBookingProcessDetails } =
    BookingProcessGlobalState();
  const [seatsObj, setSeatsObj] = useState({
    availableSeats: [],
    availableSeatsCount: 0,
    className: null,
    totalSeatsCount: 0,
  });

  const [selectedOption, setSelectedOption] = useState("");
  console.log(bookingProcessDetails);

  let prevPage = "loginAsk";
  if (currentUserData.username != null) {
    prevPage = "flightSearch";
  }

  useEffect(() => {
    async function getSeats() {
      try {
        const response = await axios.get(
          `${BaseURL}/flight/${bookingProcessDetails.flightID}/seats?className=${bookingProcessDetails.travelClass}`
        );
        console.log(response.data);
        setSeatsObj(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSeats();
  }, [
    bookingProcessDetails.flightID,
    BaseURL,
    bookingProcessDetails.travelClass,
  ]);

  // setAvailableSeats(seatsObj.availableSeats);

  function isSeatAvailable(seatNumber) {
    return seatsObj.availableSeats.includes(seatNumber);
  }

  function handlePayNow() {
    setBookingStep("makePayment");
  }
  function handleBack() {
    setBookingStep(prevPage);
  }
  return (
    <>
      <div className="cen-box">
        <div className="glass-background"></div>
        <div className="main-container">
          <div className="front-content front-text title">
            Seat Reservations : {bookingProcessDetails.travelClass}
          </div>
          <div className="tbl-grp">
            <div className="tbl-itm-1">
              <div className="tbl-container">
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(1)}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(2)}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(3)}
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(4)}
                  >
                    4
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(5)}
                  >
                    5
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(6)}
                  >
                    6
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(7)}
                  >
                    7
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(8)}
                  >
                    8
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(9)}
                  >
                    9
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(10)}
                  >
                    10
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(11)}
                  >
                    11
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(12)}
                  >
                    12
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(13)}
                  >
                    13
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(14)}
                  >
                    14
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(15)}
                  >
                    15
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(16)}
                  >
                    16
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(17)}
                  >
                    17
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(18)}
                  >
                    18
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(19)}
                  >
                    19
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(20)}
                  >
                    20
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(21)}
                  >
                    21
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(22)}
                  >
                    22
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(23)}
                  >
                    23
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(24)}
                  >
                    24
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(25)}
                  >
                    25
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(26)}
                  >
                    26
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(27)}
                  >
                    27
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(28)}
                  >
                    28
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(29)}
                  >
                    29
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(30)}
                  >
                    30
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(31)}
                  >
                    31
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(32)}
                  >
                    32
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(33)}
                  >
                    33
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(34)}
                  >
                    34
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(35)}
                  >
                    35
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(36)}
                  >
                    36
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(37)}
                  >
                    37
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(38)}
                  >
                    38
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(39)}
                  >
                    39
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(40)}
                  >
                    40
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(41)}
                  >
                    41
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(42)}
                  >
                    42
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(43)}
                  >
                    43
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(44)}
                  >
                    44
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(45)}
                  >
                    45
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(46)}
                  >
                    46
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(47)}
                  >
                    47
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(48)}
                  >
                    48
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(49)}
                  >
                    49
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(50)}
                  >
                    50
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(51)}
                  >
                    51
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(52)}
                  >
                    52
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(53)}
                  >
                    53
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(54)}
                  >
                    54
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(55)}
                  >
                    55
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(56)}
                  >
                    56
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(57)}
                  >
                    57
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(58)}
                  >
                    58
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(59)}
                  >
                    59
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(60)}
                  >
                    60
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(61)}
                  >
                    61
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(62)}
                  >
                    62
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(63)}
                  >
                    63
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(64)}
                  >
                    64
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(65)}
                  >
                    65
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(66)}
                  >
                    66
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(67)}
                  >
                    67
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(68)}
                  >
                    68
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(69)}
                  >
                    69
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(70)}
                  >
                    70
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(71)}
                  >
                    71
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(72)}
                  >
                    72
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(73)}
                  >
                    73
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(74)}
                  >
                    74
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(75)}
                  >
                    75
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(76)}
                  >
                    76
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(77)}
                  >
                    77
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(78)}
                  >
                    78
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(79)}
                  >
                    79
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(80)}
                  >
                    80
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(81)}
                  >
                    81
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(82)}
                  >
                    82
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(83)}
                  >
                    83
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(84)}
                  >
                    84
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(85)}
                  >
                    85
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(86)}
                  >
                    86
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(87)}
                  >
                    87
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(88)}
                  >
                    88
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(89)}
                  >
                    89
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(90)}
                  >
                    90
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(91)}
                  >
                    91
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(92)}
                  >
                    92
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(93)}
                  >
                    93
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(94)}
                  >
                    94
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(95)}
                  >
                    95
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(96)}
                  >
                    96
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(97)}
                  >
                    97
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(98)}
                  >
                    98
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(99)}
                  >
                    99
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(100)}
                  >
                    100
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(101)}
                  >
                    101
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(102)}
                  >
                    102
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(103)}
                  >
                    103
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(104)}
                  >
                    104
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(105)}
                  >
                    105
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(106)}
                  >
                    106
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(107)}
                  >
                    107
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(108)}
                  >
                    108
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(109)}
                  >
                    109
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(110)}
                  >
                    110
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(111)}
                  >
                    111
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(112)}
                  >
                    112
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(113)}
                  >
                    113
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(114)}
                  >
                    114
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(115)}
                  >
                    115
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(116)}
                  >
                    116
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(117)}
                  >
                    117
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(118)}
                  >
                    118
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(119)}
                  >
                    119
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(120)}
                  >
                    120
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(121)}
                  >
                    121
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(122)}
                  >
                    122
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(123)}
                  >
                    123
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(124)}
                  >
                    124
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(125)}
                  >
                    125
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(126)}
                  >
                    126
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(127)}
                  >
                    127
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(128)}
                  >
                    128
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(129)}
                  >
                    129
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(130)}
                  >
                    130
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(131)}
                  >
                    131
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(132)}
                  >
                    132
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(133)}
                  >
                    133
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(134)}
                  >
                    134
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(135)}
                  >
                    135
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(136)}
                  >
                    136
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(137)}
                  >
                    137
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(138)}
                  >
                    138
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(139)}
                  >
                    139
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(140)}
                  >
                    140
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(141)}
                  >
                    141
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(142)}
                  >
                    142
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(143)}
                  >
                    143
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(144)}
                  >
                    144
                  </button>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(145)}
                  >
                    145
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(146)}
                  >
                    146
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(147)}
                  >
                    147
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(148)}
                  >
                    148
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(149)}
                  >
                    149
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(150)}
                  >
                    150
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(151)}
                  >
                    151
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(152)}
                  >
                    152
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(153)}
                  >
                    153
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(154)}
                  >
                    154
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(155)}
                  >
                    155
                  </button>
                  <button
                    type="button"
                    className="seat-btn btn"
                    disabled={!isSeatAvailable(156)}
                  >
                    156
                  </button>
                </div>
              </div>
            </div>
            <div className="tbl-itm-2">
              <form className="seat-data">
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Last Name"
                  />
                </div>
                <label>
                  Adult / Child :&nbsp;&nbsp;
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    style={{ width: "100%", height: "30px" }}
                  >
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                  </select>
                </label>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Passport ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Passport ID"
                  />
                </div>
                <div className="reserve-btn-set">
                  <button type="button" className="reserve-btn btn">
                    Cancel
                  </button>
                  <button type="button" className="reserve-btn btn">
                    Reserve
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="btn-set">
            <button type="button" className="action-button btn">
              <Link
                to="/home"
                style={{ color: "white", textDecoration: "none" }}
              >
                Cancel
              </Link>
            </button>
            <button
              type="button"
              className="action-button btn"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              className="action-button btn"
              onClick={handlePayNow}
            >
              Pay&nbsp;Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
