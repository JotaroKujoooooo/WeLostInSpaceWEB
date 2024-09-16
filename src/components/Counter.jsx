import React, { useState } from 'react'

const Counter = function () {
    const [count, setCount] = useState(0)
    function inc() {
        setCount(count + 1)
    }

    function dec() {
        setCount(count - 1)
    }
    return (
        <div>
            <h2>Likes:{count}</h2>
            <button onClick={inc}>Like</button>
            <button onClick={dec}>Dislike</button>
        </div>
    )
}

export default Counter