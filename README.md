React를 이용하여 간단한 타이머 애플리케이션을 구현한 것입니다. 각 파일은 서로 다른 기능을 담당하며, 타이머를 시작, 일시정지, 초기화하는 버튼과 타이머 값을 화면에 표시하는 기능을 구현합니다.

전체적으로 세 개의 주요 파일이 있습니다:

1. **Timer.jsx** - 타이머의 로직과 상태 관리
2. **TimerDisplay.jsx** - 타이머 값을 화면에 표시
3. **Button.jsx** - 각 버튼을 정의하고 클릭 이벤트를 처리

---

### 1. **Timer.jsx** (타이머의 로직과 상태 관리)

**설명**:

- `Timer.jsx`는 타이머의 상태를 관리하고, 버튼 클릭에 따른 동작(시작, 일시정지, 초기화)을 처리합니다.
- `useState`와 `useRef` 훅을 사용하여 상태 관리와 타이머의 반복 동작을 설정합니다.

```jsx
import React, { useState, useRef } from 'react'
import './Timer.css' // 스타일 파일 불러오기
import TimerDisplay from './TimerDisplay' // 타이머 화면을 표시하는 컴포넌트
import Button from './Button' // 버튼 컴포넌트

const Timer = () => {
    const [time, setTime] = useState(0); // 타이머의 시간 상태 (초 단위)
    const [status, setStatus] = useState('초기화'); // 타이머 상태 (초기화, 실행중, 일시정지)
    const intervalRef = useRef(null); // setInterval ID를 저장하는 ref

    // 시간을 'MM:SS' 형식으로 포맷하는 함수
    const formatTime = () => {
        const minutes = Math.floor(time / 60); // 분 계산
        const seconds = time % 60; // 초 계산
        return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`; // 두 자리 숫자로 포맷
    }

    // 타이머 시작 함수
    const startTimer = () => {
        if (status !== '실행중') { // 실행중이 아닐 때만 실행
            setStatus('실행중'); // 상태 변경
            intervalRef.current = setInterval(() => { // 1초마다 시간 증가
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
    }

    // 타이머 일시정지 함수
    const pauseTimer = () => {
        if (status === '실행중') { // 실행중일 때만 일시정지 가능
            clearInterval(intervalRef.current); // setInterval 종료
            setStatus('일시정지'); // 상태 변경
        }
    }

    // 타이머 초기화 함수
    const resetTimer = () => {
        clearInterval(intervalRef.current); // setInterval 종료
        setStatus('초기화'); // 상태 초기화
        setTime(0); // 시간 초기화
    }

    const isRunning = status === '실행중'; // 타이머가 실행 중인지 확인

    // 버튼 배열 - 각각의 버튼에 대한 클래스명, 텍스트, 클릭 이벤트 핸들러
    const buttons = [
        { className: 'start', value: '시작', onClick: startTimer },
        { className: 'pause', value: '일시정지', onClick: pauseTimer },
        { className: 'reset', value: '초기화', onClick: resetTimer }
    ];

    return (
        <div className='timer-container'>
            {/* 타이머 화면 표시 컴포넌트 */}
            <TimerDisplay
                isRunning={isRunning}
                status={status}
                time={formatTime(time)}
            />
            <div className="button-container">
                {/* 버튼 배열을 순회하며 각 버튼 렌더링 */}
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        className={button.className}
                        value={button.value}
                        onClick={button.onClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default Timer;

```

- **주요 부분**:
    - `useState`를 사용해 `time`과 `status`를 상태로 관리합니다.
    - `useRef`를 사용해 타이머를 설정하는 `setInterval` ID를 저장합니다.
    - 버튼 클릭에 따라 타이머가 시작, 일시정지, 초기화됩니다.
    - `formatTime` 함수는 초 단위로 저장된 시간을 `MM:SS` 형식으로 변환하여 표시합니다.

---

### 2. **TimerDisplay.jsx** (타이머 화면 표시)

**설명**:

- `TimerDisplay.jsx`는 `Timer` 컴포넌트에서 넘겨받은 `time`을 화면에 표시하는 역할을 합니다.

```jsx
import React from 'react';

const TimerDisplay = ({ time }) => {
  return (
    <div className='timer-display'>
        <div className="time">{time}</div> {/* 타이머 값 출력 */}
    </div>
  );
}

export default TimerDisplay;

```

- **주요 부분**:
    - `time`을 받아서 화면에 표시합니다.
    - `time`은 `Timer.jsx`에서 포맷된 시간입니다.

---

### 3. **Button.jsx** (버튼 컴포넌트)

**설명**:

- `Button.jsx`는 버튼을 렌더링하고, 클릭 이벤트를 처리합니다.

```jsx
import React from 'react';

const Button = ({ className, value, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
}

export default Button;

```

- **주요 부분**:
    - `className`, `value`, `onClick`을 props로 받아서 버튼을 렌더링합니다.
    - `onClick`은 버튼이 클릭되었을 때 실행되는 함수입니다.

---

### 전체 구조 요약:

1. **`Timer.jsx`**:
    - 타이머 상태(`time`, `status`)를 관리하고 버튼 클릭에 따른 동작을 처리합니다.
2. **`TimerDisplay.jsx`**:
    - 타이머의 현재 시간을 화면에 표시합니다.
3. **`Button.jsx`**:
    - 타이머 동작을 위한 버튼을 렌더링하고 클릭 이벤트를 처리합니다.

---

### 작동 방식:

1. **시작**: 타이머가 실행되고 초 단위로 시간이 증가합니다.
2. **일시정지**: 타이머가 멈추고 시간이 멈춥니다.
3. **초기화**: 타이머가 초기화되어 시간이 00:00으로 돌아갑니다.
