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
        padding: '2px 15px',
        border: '1px solid brown',
        borderRadius: '10px',
        backgroundColor: 'rgb(65, 170, 230, 0.1)',
        margin: '0.5rem 1rem',
        marginBottom: '0.5rem',
        fontSize: '18px',
        fontFamily: 'Times New Romance',
        color: 'brown'

    },
    b_m: {
        padding: '2px 15px',
        border: '1px solid green',
        borderRadius: '10px',
        backgroundColor: 'rgb(230, 65, 170,  0.1)',
        margin: '0.5rem 1rem',
        marginBottom: '0.5rem',
        fontSize: '18px',
        fontFamily: 'Times New Romance',
        color: 'green'

    },
    input: {
        marginRight: '1rem'
    }
}

let dt0 = {
     'Id' :  -1
    ,'CardId': ''
    , 'Name': ''
    , 'Email': ''
    , 'BirthDay': ''
    , 'Gender': 'male'//this.gender.value
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

const todos = [
    { id: 'cardId', title: 'ת.ז.', size: 4, val: '', onchange: null },
    { id: 'name'  , title: 'שם'         , size: 4, val: '', onchange: null },
    { id: 'email' , title: 'מייל'       , size: 4, val: '', onchange: null },
    { id: 'birth' , title: 'תאריך לידה', size: 1, val: '', onchange: null },
    { id: 'gender', title: 'מין'        , size: 4, val: '', onchange: null },
    { id: 'phone' , title: 'טלפון'      , size: 1, val: '', onchange : null}
];



export default function VicList(props) {
    
    return (

        <ul style={styles.ul}>
            {
                props.todos.map((todo) => {
                    
                    return todo.id === 'gender' ?
                                 <VicSelect todo={todo} /> : 
                                 <VicInput  todo={todo} />
                })
            }
        </ul>
    )
}

function VicSelect({ todo}) {

    let val = todo.val;


//    const [value, setValue] = React.useState('');
    const classes = []

   if (todo.id % 2) {
        classes.push('done');
    }

    function OnChanged(event)
    {
        event.preventDefault();

        if (todo.onchange)
            todo.onchange(event.target.value, todo.id);
    }

    let rrGengersOptions = rGengers.map((item, i) => {
            var shortName = '   ' + item.name + '  ';
            return (
                <option key={i} value={item.Key}>{shortName}</option>
            )
        }, this);




    var styleLi = styles.li;
    return (
        <li style={styles.li}>
            <dev>
                <label for= {todo.id} >{todo.title}</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>:</label>
                &nbsp;
                &nbsp;
                <select id={todo.id} value={todo.val} onChange={OnChanged} >
                    {rrGengersOptions}
                </select>
            </dev>
        </li>
    )
}

function VicInput({ todo}) {

    let val = todo.val;
    var onChangeHandler = todo.onchange;

    function OnChanged(event) {
        event.preventDefault();
        if (todo.onchange)
            todo.onchange(event.target.value, todo.id);
    }


//    const [value, setValue] = React.useState('');
    const classes = []

    // console.log('todo.completed & Name   ', todo.completed, todo.title)

    var styleLi = styles.li;
    return (
        <li style={styles.li}>

            <dev>
                <label for={todo.id}>{todo.title}</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>:</label>
                &nbsp;
                &nbsp;
                    <input type="text" id={todo.id} value={todo.val} onChange={OnChanged} />
            </dev>
        </li>
    )
}


export class Person1 extends Component {
    displayName = Person.name

    constructor() {
        super();
        this.state = {
            persons:  [],
            prefixes: []
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);


        fetch('api/WebPersons/PersonDatas')
            .then(response => response.json())
            .then(data => {
                this.setState({ persons: data, loading: false });
            });


        fetch('api/WebPersons/PhonePrefixes')
            .then(response => response.json())
            .then(data => {
                this.setState({ prefixes: data });
            });

    }



    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
 }

    onSubmitForm() {
        console.log(this.state)
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
                    dt0.CardId  = item.cardId   ;
                    dt0.Name    = item.name     ;
                    dt0.Email   = item.email    ;
                    dt0.Gender  = item.gender   ;
                    dt0.BirthDay= item.birth    ;
                    dt0.Phone   = item.phone    ;
                    this.resetFields(dt0);
                    return item;
                }
            }, this);

        }

    }
    resetFields(d) {

        this.setState({ 'lname': d.CardId });
        this.setState({ 'rname': d.Name   });
        this.setState({ 'email': d.Email  });
   }



    render() {
        const { items } = this.state;

        let rPersonsShort = this.state.persons.length > 0
            && this.state.persons.map((item, i) => {
                var shortName = item.cardId + '   ' + item.name + '  ';
                return (
                    <option key={i} value={item.id}>{shortName}</option>
                )
            }, this);

        return (
          <div>
               <h1>אֶנוֹשׁ</h1>

            <div>
                <div >
                    <label for="Select"> בחר </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>:</label>
                    &nbsp;
                    <select value={this.state.selectedOption} onChange={this.handleChange} >
                        <option key={-1} value={-1}>הוסף חדש ...</option>
                        {rPersonsShort}
                    </select>
                </div>

                <div> 
                <div>
                    <label>
                        First Name :
                        <input
                            name="fname"
                            type="text"
                            value={this.state.fname}
                            onChange={this.onInputchange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name :
            <input
                            name="lname"
                            type="text"
                            value={this.state.lname}
                            onChange={this.onInputchange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email :
            <input
                            name="email"
                            type="text"
                            value={this.state.email}
                            onChange={this.onInputchange}
                        />
                    </label>
                </div>
                <div>
                    <button onClick={this.onSubmitForm}>Submit</button>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

export class Person extends Component {
    displayName = Person.name

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
              persons : []
            , genders : []
            , prefixes: []
            , loading: true
            , cardId: 0
            , selectedOption: null

        };

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
           ,'CardId'    : this.cardId.value
            , 'Name'    : this.name.value
            , 'Email'   : this.email.value
            , 'BirthDay': this.birth.value
            , 'Gender'  : 'male'//this.gender.value
            , 'Phone'   :   this.phone//052-8027346'//this.email.value
        }


        fetch(rUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(dt0), // data can be `string` or {object}!
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


        fetch(rUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(dt0.CardId), // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }


    handleChange    = this.handleChange.bind(this);
    OnChangedId     = this.OnChangedId.bind(this);
    OnChangedGender = this.OnChangedGender.bind(this);
    OnChanged_All   = this.OnChanged_All.bind(this);

    handleChange  (event)  {
        this.setState({ selectedOption: event.target.value });

        dt0.CardId =
            dt0.Name =
            dt0.Email =
            dt0.Phone =
            dt0.Gender =
            dt0.BirthDay = "";

        if (event.target.value == '-1') {
            this.resetFields(dt0);
        }
        else
        {
            this.state.persons.map((item, i) => {
                let len0 = 9; //sizeof(item.cardId);// item.cardId.length;
                let str = event.target.value.substring(0, len0);
                if (item.cardId === parseInt(str)) {
                    dt0.CardId  = item.cardId   ;
                    dt0.Name    = item.name     ;
                    dt0.Email   = item.email    ;
                    dt0.Gender  = item.gender   ;
                    dt0.BirthDay= item.birth    ;
                    dt0.Phone   = item.phone    ;
                    this.resetFields(dt0);
                    return item;
                }
            }, this);

        }

    }
    resetFields(d) {

        this.phone = todos[0].val = d.Phone;

        this.id = d.CardId;
        this.CardId =  d.CardId ;
    }


    OnChangedId(event)  {

        dt0.CardId = event.target.value;
//        this.setState({ cardId: id.target.value });
//        this.setState({ cardId: event.target.value });
    }

    OnChangedGender (val, id)  {

//        this.setState({ cardId: id.target.value });
        this.setState({ gender: val });
    }

    OnChanged_All (val, id)  {

        switch (id) {
            case 'cardId'   : dt0.CardId   = val; break;
            case 'name'     : dt0.Name     = val; break;
            case 'email'    : dt0.Email    = val; break;
            case 'birth'    : dt0.BirthDay = val; break;
            case 'gender'   : dt0.Gender   = val; break;
            case 'phone'    : dt0.Phone    = val; break;

            default: break;
        }       
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


        let todo = todos[0];
      todo.val = this.phone;
        todo.onchange = this.OnChangedId;

        todos.map((todo) => {

            switch (todo.id) {
                case 'gender': todo.onchange = this.OnChangedGender;
                    
                    break;
                case 'cardId': todo.onchange = this.OnChangedId;
                    break;
                default:
                               todo.onchange = this.OnChanged_All;
                // code block
            }       
        })

    return (
        <div >
            <h1> Person</h1>
            <form  onSubmit={this.handleSubmit}
                style={{ marginBottom: '1.2rem', marginRight: '2rem', direction: 'rtl' }}  >
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
                    <VicInput todo={todo} />
                </div>
                <VicList todos={todos} />
                <div >
                    <label for="CardId">ת.ז.</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>:</label>
                    &nbsp;
                    <input type="text" id="CardId" Name="CardId" ref={(CardId) => this.cardId = CardId} onChange={this.OnChangedId}/>
                </div>
                <div>
                    <label for="Name">שם</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>:</label>
                    &nbsp;
                    <input type="text" id="Name" ref={(name) => this.name = name} />
                </div>
                <div>
                    <label for="EMail">מייל</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>:</label>
                    &nbsp;
                    <input id="EMail" ref={(email) => this.email = email}  />
                </div>
                <div>
                    <label for="Birthday">תאריך לידה</label>
                    &nbsp;
                    <label>:</label>
                    &nbsp;
                    <input id="Birthday" type="datetime" ref={(birth) => this.birth = birth}  />
                </div>
                <div style={{ marginBottom: '2rem'}}>
                </div>
                <div>
                    <button type="submit" style={styles.b_m}  >   אישר ...  </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button style={styles.b_e} onClick={this.onDelete} >מחק  .. </button>
                </div>
                &nbsp;
            </form>
        </div>
    );
    }


}

