import logo from './logo.svg';
import './App.css';
import React from 'react';
import Modal from 'react-modal';
import { Member } from './Member';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [memberList, setMemberList] = useState([]);

  function setList() {
    var memberList = JSON.parse(localStorage.getItem("member"));
    if (memberList != null) {
      setMemberList(memberList);
    }
  }

  useEffect(() => {
    setList();
  }, []);

  function openModal() {
    console.log("click2")
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setList();
  }


  return (
    <div id="container">
      <div id="header"></div>

      <div id="main">
        <div>test0426Update03</div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>Click me!</button>

        <h1 className="text-3xl font-bold underline">
          Hello Tailwind CSS!
        </h1>

        {memberList.map((member, index) =>
          <div className="flex">
            <div>{member.name}</div>
          </div>)}


      </div>

      <Modal
        isOpen={modalIsOpen}
        contentLabel="modal"
      >
        <div >
          <button onClick={closeModal} className="i-lucide-x relative -top-3 -right-3 float-right font-bolder text-4xl hover:bg-gray-500"></button>
          <h2 className="text-center text-xl">設定</h2>
          <Member isMember={true} />
          <Member isMember={false} />
        </div>
      </Modal>
    </div>
  );
}

export default App;
