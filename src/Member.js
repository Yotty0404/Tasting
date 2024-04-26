import { useState } from 'react';

function Member() {
    const [memberName, setMemberName] = useState("");
    const [memberList, setMemberList] = useState([]);

    function addMember() {
        if (memberName === "") {
            console.log("empty")
        }
        else {
            console.log("tes")
            var newMember = {
                name: memberName
            }
            memberList.push(newMember);
            setMemberName("");
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                {memberList.map(member =>
                    <input value={member.name}
                        className="h-8 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    ></input>)}
                <div className="flex"><input
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="h-8 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" />
                    <button className="i-lucide-plus h-8 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={addMember}></button></div>
            </div>
        </div>
    )
}

export { Member };

