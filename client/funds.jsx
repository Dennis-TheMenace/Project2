const helper = require('./helper.js');

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
            <input className="formSubmit" type="submit" value="Add Funds" />
        </form>
    );
};

const init = async () =>
{
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<AddFundsWindow csrf={data.csrfToken} />,
        document.getElementById('addFunds')
    );
};

window.onload = init;