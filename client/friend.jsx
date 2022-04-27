const helper = require('./helper.js');
//const AccountModel = require('../server/models/Account');

const handleFriend = (e) =>
{
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#friendName').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!name)
    {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, _csrf}, loadFriendsFromServer);

    return false;
};

const handleFunds = (e) =>
{
    e.preventDefault();
    helper.hideError();

    const amount = e.target.querySelector('#funds').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(amount < 0)
    {
        helper.handleError('Enter valid amount!');
        return false;
    }

    helper.sendPost(e.target.action, {amount, _csrf});

    return false;
};

const FindFriend = (props) =>
{
    return(
        <form id="findFriends" 
            onSubmit={handleFriend}
            name="findFriends"
            action="/friend"
            method="GET"
            className="findFriends"
        >
            <label htmlFor="name">Name: </label>
            <input id="friendName" type="text" name="name" placeholder="Friend Name" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="findFriends" type="submit" value="Find Friend" />
        </form>
    );
};

const AddFundsWindow = (props) =>
{
    return(

        <form id="addFunds"
              name="addFunds"
              onSubmit={handleFunds}
              action="/funds"
              method="POST"
              className="mainForm"
        >
            <label htmlFor="funds">Add Funds: </label>
            <input id="funds" type="number" name="funds" placeholder="$$$" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input id="addFundsButton" className="formSubmit" type="submit" value="Add Funds" />
        </form>
    );
};

const FriendsList = (props) =>
{
    if(props.friends.length === 0)
    {
        return(
            <div className="friendsList">
                <h3 className="noFriends">No Friends Yet!</h3>
            </div>
        );
    }

    const friendNodes = props.friends.map(friend =>
    {
        return(
            <div key={friend._id} className="friend">
                <img src="/assets/img/blankPerson.png" alt="friend face" className="friendFace" />
                <h3 className="friendName">Name: {friend.name}</h3>
                <input id="inputFunds" type="number" placeholder='$$$'></input>
                <button id="transfer">Transfer</button>
            </div>
        );
    });

    return(
        <div className="friendsList">
            {friendNodes}
        </div>
    );
};

const loadFriendsFromServer = async () =>
{
    const response = await fetch('/getFriends');
    const data = await response.json();
    ReactDOM.render(
        <FriendsList friends={data.friends} />,
        document.getElementById('friends')
    );
};

const transferAmount = async () =>
{
    await fetch('/transfer');
};

if(document.getElementById('transfer') != null)
{
    document.getElementById('transfer')
    .addEventListener('click', (e) =>
    {
        const name = e.getElementById('friendName');
        transferAmount(name);
    });
       
}

const init = async () =>
{
    const response = await fetch('/getToken');
    const data = await response.json();

    const fundsButton = document.getElementById('fundsButton');
    const friendsButton = document.getElementById('friendsButton');

    fundsButton.addEventListener('click', (e) =>
    {
        e.preventDefault();
        ReactDOM.render(<AddFundsWindow csrf={data.csrfToken} />,
            document.getElementById('addFunds'));
        ReactDOM.unmountComponentAtNode(document.getElementById('findFriends'));
        ReactDOM.unmountComponentAtNode(document.getElementById('friends'));

        const addFundsButton = document.getElementById('addFundsButton');

        addFundsButton.addEventListener('click', (e) =>
        {
            e.preventDefault();
            ReactDOM.render(<FindFriend csrf={data.csrfToken} />,
                document.getElementById('findFriends'));
                
            ReactDOM.render(<FriendsList friends={[]} />,
                document.getElementById('friends'));
            
            ReactDOM.unmountComponentAtNode(document.getElementById('addFunds'));
            loadFriendsFromServer();
            helper.hideError();
            return false;
        });
        //const account = AccountModel.findOne(props.session.account).exec()
        //document.getElementById('friends').innerHTML = account.balance;
        helper.hideError();
        return false;
    });

    friendsButton.addEventListener('click', (e) =>
    {
        e.preventDefault();
        ReactDOM.render(<FindFriend csrf={data.csrfToken} />,
            document.getElementById('findFriends'));
            
         ReactDOM.render(<FriendsList friends={[]} />,
            document.getElementById('friends'));
        
        ReactDOM.unmountComponentAtNode(document.getElementById('addFunds'));
        loadFriendsFromServer();
        helper.hideError();
        return false;
    });

    ReactDOM.render(
        <FindFriend csrf={data.csrfToken} />,
        document.getElementById('findFriends')
    );
        
    ReactDOM.render(
        <FriendsList friends={[]} />,
        document.getElementById('friends')
    );

    loadFriendsFromServer();
};

window.onload = init;