import React, { Component } from 'react';


const styles = {
    li0: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        border: '4px solid blue',
        border: 'rgb(65, 170, 230)', borderRadius: '10px',
        backgroundColor: 'rgb(65, 170, 230, 0.1)',
        margin: '0.5rem 1rem',
        marginBottom: '0.5rem',
        fontSize: '14px',
        fontFamily: 'Times New Romance',
        color: 'green'

    },
    li: {
        padding: '5px',
        border: '4px solid blue',
        border: 'rgb(65, 170, 230)',
        borderRadius: '10px',
        backgroundColor: 'rgb(65, 170, 230, 0.1)',
        margin: '0.5rem 1rem',
        marginBottom: '0.5rem',
        fontSize: '16px',
        fontFamily: 'Tahoma',
        color: 'green'

    },
    b_e: {
        padding: '2px 20px',
        border: '1px solid brown',
        borderRadius: '10px',
        backgroundColor: 'rgb(230, 65, 170,  0.1)',
        margin: '0.5rem 1rem',
        marginBottom: '0.5rem',
        fontSize: '18px',
        fontFamily: 'Arial',
        color: 'brown'

    },
    b_m: {
        padding: '2px 20px',
        border: '1px solid navy',
        borderRadius: '10px',
        backgroundColor: 'rgb(65, 170, 230, 0.1)',
        margin: '0.5rem 1rem',
        marginBottom: '0.5rem',
        fontSize: '18px',
        fontFamily: 'Arial',
        color: 'navy'

    },
    input: {
        marginRight: '1rem'
    }
}

    function CheckData(obj, bIsDelete, rPrefix ) {

    var res = "";

    res += CheckCardId(obj.CardId);

    if (bIsDelete)
        return res;

    res += CheckBirthday(obj.BirthDay);

    res += CheckName(obj.Name);
    //        if (obj.CardId == "" || obj.CertificateId() == null) res += "<li>חובה להזין ערך בשדה סוג אישור</li>";

        res += CheckPhone(obj.Phone, rPrefix);

    return res;
}

    function  CheckCardId(cardId) {

    var res = "";

        if (!cardId) {
            res += "<li>לא רליוונטי ערך שדה ת.ז.</li>";
            return res;
        }

    if (!cardId ||  cardId.length <= 0 || cardId.length >= 12)
        res += "<li>לא רליוונטי ערך שדה ת.ז.</li>";

    let isnum = /^\d+$/.test(cardId);

    if (!isnum || cardId.substring(0, 1) === '0' || '0' === cardId.substring(cardId.length - 1, 1))
        res += "<li>לא רליוונטי שדה ת.ז.</li>";

    //   res += "<li></li>";

    return res;
}

function CheckName(rName) {

    var res = "";

    if (!rName || rName.length < 2)
        res += "<li>לא רליוונטי שדה שם.</li>";

    //    res += "<li></li>";

    return res;
}

    function CheckBirthday(rdate) {

    var res = "";

        if (!rdate) {

            res += "<li>לא רליוונטי שדה תאריך לידה</li > ";
            return;
        }


    var parsedDate = Date.parse(rdate);

    // You want to check again for !isNaN(parsedDate) here because Dates can be converted
    // to numbers, but a failed Date parse will not.
    if ( !isNaN(rdate) || isNaN(parsedDate)) {
        /* do your work */
        res += "<li>לא רליוונטי שדה תאריך לידה</li > ";
    }
    //   res += "<li></li>";

    return res;
}

    function  CheckPhone(phone, prefixes) {

    var res = "";

        if (!phone || phone.length == 0) {
            return res;
        }


    let isnum = /^\d+$/.test(phone);

    if (!isnum )
            res += "<li>לא רליוונטי שדה טלפון.</li>";

        let isPrefix = prefixes.some(textPrefiexis);

        function textPrefiexis(value, index, array) {
            return value == phone.substring(0, value.length);
        }

    if (!isPrefix)
        res += "<li>לא רליוונטי קידמת שדה טלפון.</li>";

    //   res += "<li></li>";

    return res;
}


let dt0 = {
     'Id' :  -1
    ,'CardId': ''
    , 'Name': ''
    , 'Email': ''
    , 'BirthDay': ''
    , 'Gender': ''//this.gender.value
    , 'Phone': ''//this.email.value
    , 'rEmailId' : -1
    , 'GenderKey' : 'male'
    , 'rPhoneId' : -1

}

let rGengers = [
    { key: 'male' ,  name: 'זכר' },
    { key: 'female', name: 'נקבה' },
    { key: 'otheer', name: 'אחר'}
];

let rPrefix = [];

const todos = [
    { id: 'cardId', title: 'ת.ז.', size: 4, val: '', onchange: null },
    { id: 'name'  , title: 'שם'         , size: 4, val: '', onchange: null },
    { id: 'email' , title: 'מייל'       , size: 4, val: '', onchange: null },
    { id: 'birth' , title: 'תאריך לידה', size: 1, val: '', onchange: null },
    { id: 'gender', title: 'מין'        , size: 4, val: '', onchange: null },
    { id: 'phone' , title: 'טלפון'      , size: 1, val: '', onchange : null}
];

export class Person extends Component {
    displayName = Person.name

    constructor(props) {
        super(props);
        this.state = {
              persons : []
            , genders : []
            , prefixes: []
            , loading: true
            , cardId: 0
            , selectedOption: null

        };

        this.onInputchange  = this.onInputchange.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleChange   = this.handleChange.bind(this);
        this.onDelete       = this.onDelete.bind(this);

        fetch('api/WebPersons/PersonDatas')
            .then(response => response.json())
            .then(data => {
                this.setState({ persons: data, loading: false });
            });

        fetch('api/WebPersons/Genders')
            .then(response => response.json())
            .then(data => {
                this.setState({ genders: data});
            });

        fetch('api/WebPersons/PhonePrefixes')
            .then(response => response.json())
            .then(data => {
                this.setState({ prefixes: data});
            });
    }

    handleSubmit(e) {
        e.preventDefault();



        let rUrl = 'api/WebPersons/SavePersonDetail';

        let dt = {
            'Id'        : dt0.Id //-1
           ,'CardId'    : this.state.cardid  
            , 'Name'    : this.state.name    
            , 'Email'   : this.state.email    
            , 'BirthDay': this.state.birthday
            , 'Gender'  : this.state.gender   
            , 'Phone'   : this.state.phone   //052-8027346'//this.email.value
        }

        var res = CheckData(dt , false, this.state.prefixes);
        if (res != '') {
            alert(res);
            return;
        }


        fetch(rUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(dt), // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }

    onDelete(e) {
        e.preventDefault();
        let rUrl = 'api/WebPersons/DeletePerson';

        let dt = {
            'Id': dt0.Id //-1
            , 'CardId': this.state.cardid
        }

        var res = CheckData(dt, true, null);
        if (res != '') {
            alert(res);
            return;
        }


        fetch(rUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(dt.CardId), // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }

    handleChange  (event)  {
        this.setState({ selectedOption: event.target.value });

        dt0.CardId       =
            dt0.Name     =
            dt0.Email    =
            dt0.Phone    =
            dt0.Gender   =
            dt0.BirthDay = "";

        if (event.target.value == '-1') {
            this.resetFields(dt0);
        }
        else
        {
            this.state.persons.map((item, i) => {
                let len0 = 9; //sizeof(item.cardId);// item.cardId.length;
                let str = event.target.value.substring(0, len0);
//              if (item.cardId === parseInt(str)) {
                if (item.id === parseInt(str)) {
                    dt0.CardId   = item.cardId   ;
                    dt0.Name     = item.name     ;
                    dt0.Email    = item.email    ;
                    dt0.Gender   = item.gender   ;
                    dt0.BirthDay = item.birthDay ;
                    dt0.Phone    = item.phone;

                    this.resetFields(dt0);
                    return item;
                }
            }, this);

        }

    }


    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    resetFields(d) {
        this.setState({ 'cardid'    : d.CardId   });
        this.setState({ 'name'      : d.Name     });
        this.setState({ 'email'     : d.Email   });
        this.setState({ 'birthday'  : d.BirthDay });
        this.setState({ 'phone'     : d.Phone    });
        this.setState({ 'gender'    : d.Gender   });
   }


    static renderPersonDatails(persons) {
        let listOfObjects = new Array();

        persons.map(per =>
            {
                listOfObjects.push(per.cardId + '   ' + per.name + '  ');
            }
        )
        return listOfObjects;
    }



    render() {
        const { selectedOption } = this.state;
        let rPersonsShort1 = Person.renderPersonDatails(this.state.persons);

        let rPersonsShort = this.state.persons.length > 0
            && this.state.persons.map((item, i) => {
                var shortName = item.cardId + '   ' + item.name + '  ';
                return (
                    <option key={i} value={item.id}>{shortName}</option>
                )
            }, this);


        let rrGengersOptions = rGengers.map((item, i) => {
            var shortName = '   ' + item.name + '  ';
            return (
                <option key={i} value={item.Key}>{shortName}</option>
            )
        }, this);



        return (
            <div >
                <h1 style={{ marginBottom: '1.2rem', marginRight: '2rem', direction: 'rtl' }}>אֶנוֹשׁ</h1>
                <form  onSubmit={this.handleSubmit}
                    style={{ marginBottom: '1.2rem', marginRight: '2rem', direction: 'rtl' }}  >
                  <li style={styles.li}>
                  <div >
                        <label for="Select"> בחר </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>:</label>
                        &nbsp;
                        <select value={this.state.selectedOption}  onChange={this.handleChange} >
                            <option key={-1} value={-1}>הוסף חדש ...</option>
                            {rPersonsShort}
                        </select>
                    </div>
                    <div style={{ marginBottom: '3rem' }}>
                    </div>
                    <div >
                        <label for="cardid">ת.ז.</label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;    <label>:</label>  &nbsp;
                        <input type="text" id="cardid" name="cardid" value={this.state.cardid} onChange={this.onInputchange}/>
                    </div>
                    <div>
                        <label for="name">שם</label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;  <label>:</label>   &nbsp;
                        <input type="text" id="name" name="name" value={this.state.name} onChange={this.onInputchange} />
                    </div>
                    <div>
                        <label for="EMail">מייל</label>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;   <label>:</label>  &nbsp;
                        <input type="text" id="email" name="email" value={this.state.email} onChange={this.onInputchange} />
                    </div>
                    <div>
                        <label for="Birthday">תאריך לידה</label>&nbsp; <label>:</label> &nbsp;
                        <input type="text" id="birthday" name="birthday" value={this.state.birthday} onChange={this.onInputchange} />
                    </div>
                    <dev>
                        <label for='gender' >מין</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; <label>:</label>  &nbsp;
                        <select id="gender" name='gender' value={this.state.genders} onChange={this.onInputchange}>
                            {rrGengersOptions}
                        </select>
                    </dev>
                    <div>
                        <label for="phone">טלפון</label>  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;  <label>:</label> &nbsp;&nbsp; 
                        <input type="text" id="phone" name="phone" value={this.state.phone} onChange={this.onInputchange} />
                    </div>

                    <div style={{ marginBottom: '2rem'}}>
                    </div>
                    <div>
                        <button type="submit" style={styles.b_m}  >   אישר ...  </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button style={styles.b_e} onClick={this.onDelete} >מחק  .. </button>
                    </div>
                    &nbsp;
                 </li>    
                </form>
            </div>
        );
    }


}
