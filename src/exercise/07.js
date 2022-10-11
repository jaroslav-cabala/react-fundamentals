// Rendering Lists
// http://localhost:3000/isolated/exercise/07.js

import * as React from 'react'

const allItems = [
  {id: 'apple', value: '🍎 apple'},
  {id: 'orange', value: '🍊 orange'},
  {id: 'grape', value: '🍇 grape'},
  {id: 'pear', value: '🍐 pear'},
]

function App() {
  const [items, setItems] = React.useState(allItems)
  const [shuffling, setShuffling] = React.useState('off')
  const [intervalId, setIntervalId] = React.useState(null)

  function addItem() {
    const itemIds = items.map(i => i.id)
    setItems([...items, allItems.find(i => !itemIds.includes(i.id))])
  }

  function removeItem(item) {
    setItems(items.filter(i => i.id !== item.id))
  }

  function toggleShuffling() {
    if (shuffling === 'on') {
      clearInterval(intervalId)
      setShuffling('off')
    } else {
      const intervalId = setInterval(shuffleInputs, 700)
      setIntervalId(intervalId)
      setShuffling('on')
    }
  }

  function shuffleInputs() {
    const itemsCopy = [...items]

    do {
      const randomItemIndex = Math.floor(Math.random() * 4)
      const randomItem = itemsCopy.at(randomItemIndex)
      const firstItem = itemsCopy.shift()

      itemsCopy.unshift(randomItem)
      itemsCopy[randomItemIndex] = firstItem
    } while (isOrderDifferent(itemsCopy, items))

    setItems(itemsCopy)
  }

  function isOrderDifferent(array1, array2) {
    array1.every((value, index) => array2.at(index) !== value)
  }

  return (
    <div className="keys">
      {/* <button disabled={items.length >= allItems.length} onClick={addItem}>
        add item
      </button>
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {items.map(item => (
          // 🐨 add a key prop to the <li> below. Set it to item.id
          <li>
            <button onClick={() => removeItem(item)}>remove</button>{' '}
            <label htmlFor={`${item.id}-input`}>{item.value}</label>{' '}
            <input id={`${item.id}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ul> */}
      <div>
        <button onClick={toggleShuffling}>
          {shuffling === 'off' ? 'Start sfuffling' : 'Stop shuffling'}
        </button>
      </div>
      <hr />
      <div>
        {items.map(item => (
          <input
            key={item.id}
            id={`${item.id}-input`}
            defaultValue={item.value}
          />
        ))}
      </div>
    </div>
  )
}

export default App
