import { useState } from 'react';
import { useEffect } from 'react';

function Member(prop) {
    const [memberName, setMemberName] = useState("");
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {

        var list = JSON.parse(localStorage.getItem(prop.isMember ? "member" : "item"));
        if(list == null) return;
        setMemberList(list)

    }, []);


    function addMember() {
        if (memberName === "") {
        }
        else {
            var id = 0;

            if (memberList.length > 0) {
                id = Math.max.apply(null, memberList.map((x) => { return x.id })) + 1;
            }

            var newMember = {
                id: id,
                name: memberName
            }
            memberList.push(newMember);
            setMemberName("");

            localStorage.setItem(prop.isMember ? "member" : "item", JSON.stringify(memberList));
        }
    }

    function deleteMember(e) {
        var removeId = e.target.parentNode.querySelector('input').id;
        var newMemberList = [...memberList.filter(member => member.id != removeId)];
        setMemberList(newMemberList)

        localStorage.setItem(prop.isMember ? "member" : "item", JSON.stringify(newMemberList));
    }

    const handleInputChange = (index, value) => {
        const newMemberList = [...memberList];
        newMemberList[index].name = value;
        setMemberList(newMemberList);

        localStorage.setItem(prop.isMember ? "member" : "item", JSON.stringify(newMemberList));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            var button = e.target.parentNode.querySelector('button');
            button.click();
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-2">
                {memberList.map((member, index) =>
                    <div className="flex">
                        <input id={member.id}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            value={member.name}
                            className="h-8 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                        ></input>
                        <button className="i-lucide-trash-2 h-8 bg-gray-400 active:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={deleteMember}></button>
                    </div>)}
                <div className="flex">
                    <input
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="h-8 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" />
                    <button className="i-lucide-plus h-8 bg-gray-400 active:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={addMember}></button>
                </div>
            </div>
        </div>
    )
}

export { Member };

