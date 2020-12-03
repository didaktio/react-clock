import './App.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';


/* ------- Components START ------- */
export const App = () => (
  <div className="App">
    <Timer />
  </div>
);


const Timer = () => {
  const [{ isOn, seconds }, setState] = useState({ isOn: false, seconds: 0 } as TimerState),
    tickerId = useRef(null as any),
    handleButtonClick = ({ target: { className } }: TimerButtonEvent) => setState(state =>
      className === 'Timer__start-button' ? { ...state, isOn: true }
        : className === 'Timer__stop-button' ? { ...state, isOn: false }
          : { ...state, seconds: 0 });

  useEffect(() => {
    if (isOn) tickerId.current = setInterval(() => setState(state => ({ ...state, seconds: state.seconds + 1 })), 1000);
    else if (tickerId.current) clearInterval(tickerId.current);
  }, [isOn]);

  return (
    <div className="Timer">
      <img src={logo} alt="React logo" className={`Timer__image${seconds ? ' Timer__image--animation' : ''}${seconds ? (isOn ? ' Timer__image--play' : ' Timer__image--pause') : ''}`} />
      <div className="Timer__time">
        <Time seconds={seconds} />
      </div>
      <div className="Timer__buttons" onClick={e => handleButtonClick(e as any as TimerButtonEvent)}>
        <button disabled={isOn} className="Timer__start-button">Start</button>
        <button disabled={!isOn} className={`Timer__stop-button${!isOn ? ' Timer__button--disabled' : ''}`}>Stop</button>
        <button className="Timer__reset-button">Reset</button>
      </div>
    </div>
  );
}

const Time = ({ seconds }: { seconds: number; }) => {
  const [{ displayFormat, format }, setState] = useState({ displayFormat: false, format: 'seconds' } as TimeState);
  return (
    <div className="Time">
      {
        displayFormat &&
        <div className="Time__format-tip">
          <TimeFormatNote format={format} seconds={seconds} />
        </div>
      }
      <div className="Time__text-container">
        <h3 className="Time__text"
          onClick={e => setState(state => ({ ...state, format: getNextFormat(format) }))}
          onMouseEnter={e => setState(state => ({ ...state, displayFormat: true }))}
          onMouseLeave={e => setState(state => ({ ...state, displayFormat: false }))}>
          {convertSeconds(format, seconds)}
        </h3>
      </div>

    </div >
  )
}

const TimeFormatNote = ({ format, seconds }: { format: TimeFormatType; seconds: number; }) => {
  const nextFormat = getNextFormat(format),
    example = convertSeconds(nextFormat, seconds);
  return (
    <div className="TimeFormat">
      <div className="TimeFormat__note" >Change to {nextFormat}
        <span className="TimeFormat__example">({example})</span>
      </div>
    </div>
  );
}

/* ------- Components END ------- */


const convertSeconds = (format: TimeFormatType, seconds: number) => format === 'seconds' ? `${seconds}s`
  : format === 'milliseconds' ? `${(seconds * 1000).toLocaleString()}ms`
    : format === 'nanoseconds' ? `${(seconds * 1000000000).toLocaleString()}ns`
      : secsToHHMMSS(seconds);

const timeFormats = ['seconds', 'milliseconds', 'nanoseconds', 'clock'] as const;
type TimeFormatType = typeof timeFormats[number];

const getNextFormat = (format: TimeFormatType) => {
  const index = timeFormats.indexOf(format);
  return timeFormats[index === timeFormats.length - 1 ? 0 : index + 1];
}

const secsToHHMMSS = (seconds: number) => {
  let hrs: (number | string) = Math.floor(+seconds / 3600),
    mins: (number | string) = Math.floor((+seconds - (hrs * 3600)) / 60),
    secs: (number | string) = Math.floor(+seconds - (hrs * 3600) - (mins * 60));

  if (hrs < 10) hrs = '0' + hrs;
  if (mins < 10) mins = '0' + mins;
  if (secs < 10) secs = '0' + secs;
  return `${hrs}:${mins}:${secs}`.split('.')[0];
}

interface TimerButtonsElement extends HTMLDivElement {
  className: string;
}

interface TimerButtonEvent extends SyntheticEvent {
  target: TimerButtonsElement;
}

interface TimerState {
  isOn: boolean;
  seconds: number;
}

interface TimeState {
  displayFormat: boolean;
  format: typeof timeFormats[number];
}