console.log("this is api website")

//utility function to add document to string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
//intialize parameter count
let addedParamsCount = 0;

//initially hide parameter box
let parameterBox = document.getElementById('ParametersBox');
parameterBox.style.display = 'none';

//hide parameter box if someone click json
let JsonRadios = document.getElementById('JsonRadios');
JsonRadios.addEventListener('click', () => {
    document.getElementById('ParametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//hide request box if someone click custom parameters
let ParamsRadios = document.getElementById('ParamsRadios');
ParamsRadios.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('ParametersBox').style.display = 'block';
})

//if someone clicks on +,add more parameter
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div>
                       
                      <div>
                     <h3> Parameter${addedParamsCount + 2}  <input type="text" class="parameter" id="ParameterKey${addedParamsCount + 2}" placeholder="Enter parameter ${addedParamsCount + 2} Key">
                      
                        <input type="text" class="parameter1" id="ParameterValue${addedParamsCount + 2}" placeholder="Enter parameter ${addedParamsCount + 2} Value">
                        <button class="deleteparams">-</button>
                        </div>
                    </div>`
    //convert element to dom
    let paramsElement = getElementFromString(string);
    params.append(paramsElement);
    //add event listener to - button
    let deleteparams = document.getElementsByClassName('deleteparams');
    for (items of deleteparams)
        items.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    addedParamsCount++;
})

//add event listener to submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responsePre').value = `please wait......fetching request`;
    //get value of url
    let url = document.getElementById('url').value;
    let requesttype = document.querySelector("input[name='requestType']:checked").value;
    let ContentType = document.querySelector("input[name= 'ContentType']:checked").value;

    //add parameters
    if (ContentType == 'params') {
        Data = {};
        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('ParameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('ParameterKey' + (i + 1)).value;
                let value = document.getElementById('ParameterValue' + (i + 1)).value;
                Data[key] = value;
            }
        }
        data = JSON.stringify(Data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    console.log("url is:", url);
    console.log("contenttype is:", ContentType);
    console.log("requesttype is:", requesttype);
    console.log("data is: ", data);


    if (requesttype == 'GET') {
        fetch(url, {
            method: 'GET',
        }).then(response => response.text())
            .then((text) => {

                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {

                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });

    }

})