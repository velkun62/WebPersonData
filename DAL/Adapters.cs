using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL
{
    using adapterPersons = DAL.dsCommonsTableAdapters.adapterPersons;
    using adapterGenders = DAL.dsCommonsTableAdapters.adapterGenders;
    using adapterPhonePrefix = DAL.dsCommonsTableAdapters.adapterPhonePrefix;
    using rowPhonePrefix = DAL.dsCommons.dtPhonePrefixRow;
    using RowPerson = DAL.dsCommons.dtPersonsRow;

    using dtPersons = DAL.dsCommons.dtGendersDataTable;

    using SqlConnection = System.Data.SqlClient.SqlConnection;
    public class adapterPersons : DAL.dsCommonsTableAdapters.adapterPersons
    {

        public adapterPersons()
        {
            Connection.ConnectionString =  Properties.Settings.Default.WebPersonDataConnectionString;
        }

    }
    public class adapterGenders : DAL.dsCommonsTableAdapters.adapterGenders
    {
        public adapterGenders()
        {
            Connection.ConnectionString =  Properties.Settings.Default.WebPersonDataConnectionString;
        }

    }
    public class adapterPhonePrefix : DAL.dsCommonsTableAdapters.adapterPhonePrefix
    {
        public adapterPhonePrefix()
        {
            Connection.ConnectionString =  Properties.Settings.Default.WebPersonDataConnectionString;
        }

    }
}
