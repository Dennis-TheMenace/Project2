const helper = require('./helper.js');

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
}

const FindFriend = (props) =>
{
    return(
        <form id="findFriend"
            onSubmit={handleFriend}
            name="findFriend"
            action="/maker"
            method="GET"
            className="findFriend"
        >
            <label htmlFor="name">Name: </label>
            <input id="freindName" type="text" name="name" placeholder="Friend Name" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
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
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="friendName">Name: {friend.name}</h3>
            </div>
        );
    });

    return(
        <div className="friendsList">
            {friendNodes}
        </div>
    );
}

const loadFriendsFromServer = async () =>
{
    const response = await fetch('/getFriends');
    const data = await response.json();
    ReactDOM.render(
        <FriendsList friend={data.friend} />,
        document.getElementById('friends')
    );
}

const init = async () =>
{
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <FindFriend csrf={data.csrfToken} />,
        document.getElementById('findFriend')
    );

    ReactDOM.render(
        <FriendsList friends={[]} />,
        document.getElementById('friends')
    );

    loadFriendsFromServer();
}

window.onload = init;