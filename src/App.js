import logo from './logo.svg';
import './App.css';
import React from 'react';
import Modal from 'react-modal';
import { Member } from './Member';
import { useState, useRef, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalResultIsOpen, setIsOpenResult] = React.useState(false);
  const [memberList, setMemberList] = useState([]);
  const [result, setResult] = useState(() => {
    const resultJson = JSON.parse(localStorage.getItem("result"));
    if (resultJson === null) {
      return [];
    }
    else {
      return resultJson;
    }
  });
  const [gameCount, setGameCount] = useState(() => {
    const resultJson = JSON.parse(localStorage.getItem("result"));
    if (resultJson === null) {
      return 1;
    }
    else {
      return resultJson.length + 1;
    }
  });

  useEffect(() => {
    setList();
  }, []);

  function setList() {
    var memberListJson = JSON.parse(localStorage.getItem("member"));

    if (memberList.length == memberListJson.length) {
      var isAllSameName = true;
      for (let i = 0; i < memberList.length; i++) {
        if (memberList[i].name != memberListJson[i].name || memberList[i].isAbstention != memberListJson[i].isAbstention) {
          isAllSameName = false;
        }
      }
      if (isAllSameName) return;
    }

    if (memberListJson != null) {
      memberListJson.forEach((member) => {
        member.score = 0;
      });
      setMemberList(memberListJson);
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
    const idList = memberList.filter(x => !x.isAbstention && !x.isGameMaster).map(item => item.id);

    loopInRandomOrder(idList, (targetId) => {
      const availableItems = itemList.filter(item => !Object.values(assignments).includes(item));
      const randomIndex = Math.floor(Math.random() * availableItems.length);
      assignments[targetId] = availableItems[randomIndex];

      if (Object.keys(assignments).length === itemList.length) {
        assignments = {};
      }

      const targetElement = memberList.find(item => item.id === targetId);
      var lastResult = result[result.length - 1];

      if (lastResult != undefined) {
        var lastItem = lastResult.find(x => x.id === targetElement.id);

        //一度結果画面を開いた後を考慮
        if (lastItem == undefined) {
          lastItem = result[result.length - 2].find(x => x.id === targetElement.id);
        }

        if (lastItem != undefined && !lastItem.isGameMaster && !lastItem.isAbstention && lastItem.item.id == availableItems[randomIndex].id) {
          targetElement.isSameItem = true;
        }
        else {
          targetElement.isSameItem = false;
        }
      }
      else {
        targetElement.isSameItem = false;
      }
      targetElement['item'] = availableItems[randomIndex];
    });

    memberList.filter(x => x.isAbstention || x.isGameMaster).map(member => {
      member.isSameItem = false;
      member['item'] = { id: -1, name: '-', isSameItem: false }
    });

    setMemberList([...memberList]);
  }

  function submit() {
    confirmAlert({
      message: 'このゲームを確定しますか？',
      buttons: [
        {
          label: 'はい',
          onClick: () => {
            register()
          }
        },
        {
          label: 'いいえ',
        }
      ]
    });
  };

  function register() {
    var resultList = []
    const resultJson = JSON.parse(localStorage.getItem("result"));
    if (resultJson === null) {
      resultList = [memberList];
    }
    else {
      resultJson.push(memberList);
      resultList = resultJson;
    }
    localStorage.setItem('result', JSON.stringify(resultList));
    setResult(resultList)
    setGameCount(gameCount + 1);

    memberList.forEach((member) => {
      member.score = 0;
      member.item = [];
    });
  }

  function plus(index) {
    const newMemberList = [...memberList];
    newMemberList[index].score += 1;
    setMemberList(newMemberList);
  }

  function minus(index) {
    const newMemberList = [...memberList];
    newMemberList[index].score -= 1;
    setMemberList(newMemberList);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setList();
  }

  function openModalResult() {
    var resultJson = JSON.parse(localStorage.getItem("result"));
    if (resultJson == null) {
      resultJson = [];
    }
    else {
      var sumList = [];

      memberList.forEach(member => {
        var sum = 0;

        resultJson.forEach(resultRow => {
          var o = resultRow.find(x => x.name === member.name);
          if (o) {
            sum += o.score;
          }
        });

        var sumRow = {};
        sumRow.name = member.name;
        sumRow.score = sum;
        sumRow.item = { name: "　" };
        sumRow.isTotal = true;

        sumList.push(sumRow);
      });

      resultJson.push(sumList);
    }

    setResult(resultJson == null ? [] : resultJson);
    setIsOpenResult(true);
  }

  function closeModalResult() {
    setIsOpenResult(false);
  }

  function deleteResultMessage() {
    confirmAlert({
      message: '結果をすべて削除しますか？',
      buttons: [
        {
          label: 'はい',
          onClick: () => deleteResult()
        },
        {
          label: 'いいえ',
        }
      ]
    });
  };

  function deleteResult() {
    localStorage.removeItem("result");
    setResult([]);
    setGameCount(1);
  }

  function setGameMaster(index) {
    const newMemberList = [...memberList];

    for (let i = 0; i < memberList.length; i++) {
      if (i == index) {
        newMemberList[i].isGameMaster = true;
        newMemberList[i].score = 0;
      }
      else {
        newMemberList[i].isGameMaster = false;
      }
    }

    setMemberList(newMemberList);
  }

  return (
    <div id="container">
      <div id="header">
        <div className='button_label' onClick={openModalResult}>
          <span className="i-lucide-list relative float-right font-bolder text-3xl bg-gray-500 cursor-pointer active:bg-gray-900"></span>
          <div>結果</div>
        </div>
        <div className='button_label setting_container' onClick={openModal} >
          <span className="i-lucide-settings relative float-right font-bolder text-3xl bg-gray-500 cursor-pointer active:bg-gray-900"></span>
          <div>設定</div>
        </div>
      </div>

      <div id="main">
        <div id="main_buttons" className='relative w-full'>
          <div className='button_label' onClick={shuffle}>
            <span className="i-lucide-refresh-ccw relative font-bolder text-3xl bg-gray-500 cursor-pointer active:bg-gray-900"></span>
            <div>シャッフル</div>
          </div>
          <div className='button_label absolute float-right -top-2 -right-0'
            onClick={submit}>
            <span className="i-lucide-square-check-big relative font-bolder text-3xl bg-gray-500 cursor-pointer active:bg-gray-900"></span>
            <div>次のゲームへ</div>
          </div>
        </div>

        <div id="game_count" className='font-bold underline underline-offset-4'>{gameCount == 0 ? '' : `第${gameCount}回`}</div>

        <div iD="main_container">
          {memberList.map((member, index) =>
            <div className={index % 2 === 0 ? "main_row" : "main_row odd"}>
              <div className={member.isGameMaster ? "main_member gameMaster" : member.isAbstention ? "main_member abstention_member" : "main_member"} onClick={(e) => setGameMaster(index)}>{member.name}</div>
              <div className={member.isSameItem ? "main_item sameItem" : "main_item"}>{member.item !== undefined ? member.item.name : ''}</div>
              <div className={member.isGameMaster || member.isAbstention ? "main_score_container cant_change_score" : "main_score_container"}>
                <span onClick={(e) => minus(index)} className="i-lucide-minus relative float-right font-bolder text-5xl bg-gray-500 cursor-pointer active:bg-gray-900"></span>
                <div className='main_score'>{member.score}</div>
                <span onClick={(e) => plus(index)} className="i-lucide-plus relative float-right font-bolder text-5xl bg-gray-500 cursor-pointer active:bg-gray-900"></span>
              </div>
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
          <h2 className="text-center text-xl m-2">メンバーリスト</h2>
          <div id="modal_container">
            <Member isMember={true} />
            <div className="m-2"></div>
            <h2 className="text-center text-xl m-2">アイテムリスト</h2>
            <Member isMember={false} />
          </div>
        </div>
      </Modal>


      <Modal
        isOpen={modalResultIsOpen}
        contentLabel="modalResult"
        id="modalResult"
      >
        <div >
          <button onClick={closeModalResult} className="i-lucide-x relative -top-2 -right-0 float-right font-bolder text-4xl bg-gray-500 active:bg-gray-900"></button>
          <button className="i-lucide-trash-2 h-8 bg-gray-400 active:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            onClick={deleteResultMessage}></button>


          <div className="table-wrap my-4">
            <table>
              <tr>
                <td className='result_name'></td>
                {result.map((resultRow, index) =>
                  <td className='text-center total'>
                    {index == result.length - 1 ? "合計" : `第${index + 1}回`}
                  </td>
                )}
              </tr>
              {memberList.map((member, index) =>
                <tr>
                  <td className='result_name'>{member.name}</td>

                  {result.map((resultRow, index2) =>
                    <td className={resultRow[index] != undefined && resultRow[index].isTotal ? "result_info total_num" : "result_info"}>
                      <div>{resultRow[index] == undefined || resultRow[index].item == undefined ? '' : resultRow[index].item.name}</div>
                      <div>{resultRow[index] == undefined ? '' : resultRow[index].score}</div>
                    </td>
                  )}

                </tr>
              )}
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
