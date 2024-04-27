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

  useEffect(() => {
    setList();
  }, []);

  function setList() {
    var memberList = JSON.parse(localStorage.getItem("member"));
    if (memberList != null) {
      setMemberList(memberList);
    }
  }

  function loopInRandomOrder(array, callback) {
    // 配列をランダムに並べ替える
    const shuffledArray = array.sort(() => Math.random() - 0.5);

    // ランダムな順番で要素を反復処理
    shuffledArray.forEach((element) => {
      callback(element);
    });
  }

  function shuffle() {
    let assignments = {};
    const itemList = JSON.parse(localStorage.getItem("item"));
    const idList = memberList.map(item => item.id);

    loopInRandomOrder(idList, (targetId) => {
      const availableItems = itemList.filter(item => !Object.values(assignments).includes(item));
      const randomIndex = Math.floor(Math.random() * availableItems.length);
      assignments[targetId] = availableItems[randomIndex];

      if (Object.keys(assignments).length === itemList.length) {
        assignments = {};
      }

      const targetElement = memberList.find(item => item.id === targetId);
      targetElement['item'] = availableItems[randomIndex];
    });

    setMemberList([...memberList]);
  }

  
  function register() {

  }


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setList();
  }


  return (
    <div id="container">
      <div id="header">
        <span onClick={openModal} className="i-lucide-settings relative float-right font-bolder text-3xl bg-gray-500 cursor-pointer active:bg-gray-900"></span>
      </div>

      <div id="main">
        <div id="main_buttons">
          <span onClick={shuffle} className="i-lucide-refresh-ccw relative float-right font-bolder text-3xl bg-gray-500 cursor-pointer active:bg-gray-900"></span>
          <span onClick={register} className="i-lucide-square-check-big relative float-right font-bolder text-3xl bg-gray-500 cursor-pointer active:bg-gray-900"></span>
        </div>

        <div iD="main_container">
          {memberList.map((member, index) =>
            <div className={index % 2 === 0 ? "main_row" : "main_row odd"}>
              <div className='main_member'>{member.name}</div>
              <div className='main_item'>{member.item !== undefined ? member.item.name : ''}</div>
              <div className='main_score'>score</div>
            </div>)}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        contentLabel="modal"
        id="modal"
      >
        <div >
          <button onClick={closeModal} className="i-lucide-x relative -top-2 -right-0 float-right font-bolder text-4xl bg-gray-500 active:bg-gray-900"></button>
          <h2 className="text-center text-xl">設定</h2>
          <div id="modal_container">
            <Member isMember={true} />
            <div className="m-4"></div>
            <Member isMember={false} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
