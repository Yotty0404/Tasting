import logo from './logo.svg';
import './App.css';
import React from 'react';
import Modal from 'react-modal';
import { Member } from './Member';

function App() {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    console.log("click2")
    setIsOpen(true);
  }

  function closeModal() {
    console.log("clickclose")
    setIsOpen(false);
  }


  return (
    <div className="App">
      <header className="App-header">
        <div>test0426Update02</div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>Click me!</button>

        <h1 className="text-3xl font-bold underline">
          Hello Tailwind CSS!
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="modal"
      >
        <div >
          <button onClick={closeModal} className="i-lucide-x relative -top-3 -right-3 float-right font-bolder text-4xl hover:bg-gray-500"></button>
          <h2 className="text-center text-xl">設定</h2>
          <Member />
        </div>
      </Modal>
    </div>
  );
}

export default App;
