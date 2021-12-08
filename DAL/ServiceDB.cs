using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL
{
 //  using adapterPersons = DAL.dsCommonsTableAdapters.adapterPersons;
//    using adapterGenders = DAL.dsCommonsTableAdapters.adapterGenders;
//  using adapterPhonePrefix = DAL.dsCommonsTableAdapters.adapterPhonePrefix;
    using rowPhonePrefix = DAL.dsCommons.dtPhonePrefixRow;
    using RowPerson = DAL.dsCommons.dtPersonsRow;
    using dtGendersRow = DAL.dsCommons.dtGendersRow;

    using dtPersons = DAL.dsCommons.dtGendersDataTable;

    using SqlConnection = System.Data.SqlClient.SqlConnection;
    static public class ServiceDB
    {
        public static string[] ArrPhonePrefixes { get; set; } = null;

        public static string[] Get_Prefixes()
        {
            var lst = new List<string>();
            try
            {
                if (ArrPhonePrefixes != null)
                    return ArrPhonePrefixes;

                var rAdapter = new adapterPhonePrefix();

       
                foreach (rowPhonePrefix row in rAdapter.Get_tPhonePrefix().Rows)
                    lst.Add(row.tPrefix);

                ArrPhonePrefixes = lst.ToArray();

                return ArrPhonePrefixes;
            }
            catch (Exception ex)
            {
                Console.Write(ex);

                return lst.ToArray();
            }
        }
        public static RowPerson[] Get_Persons()
        {
            var lst = new List<RowPerson>();
            try
            {
                var rAdapter = new adapterPersons();
                
                rAdapter.Connection.ConnectionString = Properties.Settings.Default.WebPersonDataConnectionString;
                var dt = rAdapter.Get_Persons();
                //= from i  in rAdapter.Get_tPhonePrefix().Rows select rowPhonePrefix;

                foreach (RowPerson row in dt.Rows)
                    lst.Add(row);

                return lst.ToArray();
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return lst.ToArray();

            }

        }

        public static Dictionary<string, string> Get_Genders()
        {
            var rMap = new Dictionary<string, string>();
            try
            {
                var adapter = new adapterGenders();
                var dt = adapter.Get_Genders();
                //= from i  in rAdapter.Get_tPhonePrefix().Rows select rowPhonePrefix;

                foreach (dtGendersRow row in dt.Rows)
                    rMap[row.key] = row.Name;


                return rMap;
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return rMap;
            }
        }
        public static bool Delete_Person(int? nId)
        {
            try
            {
                var adapter = new adapterPersons();
                adapter.Delete_Person(nId);
                return true;
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return false;
            }
        }
        public static int Save_Phone(string rPhone, out string rPhonePrefix, out string rNumber)
        {
            try
            {
                if (ArrPhonePrefixes == null)
                {
                    var rAdapter = new adapterPhonePrefix();
                    var lst = new List<string>();
                    
                    foreach (rowPhonePrefix row in rAdapter.Get_tPhonePrefix().Rows)
                        lst.Add(row.tPrefix);

                    ArrPhonePrefixes = lst.ToArray();
                }

                rPhonePrefix = ""; rNumber = "";
                foreach (var pref in ArrPhonePrefixes)
                {
                    var sSub = rPhone.Substring(0, pref.Length);
                    if (pref.Equals(sSub))
                    {
                        rPhonePrefix = pref;
                        rNumber = rPhone.Substring(pref.Length);
                        break;
                    }
                }
                int? ID = -1;
                var dsAdapter = new adapterPersons();

              dsAdapter.Save_Phone(ref ID, rPhonePrefix, rNumber);

                return ID.Value;
            }
            catch (Exception ex)
            {
                Console.Write(ex);

                rPhonePrefix = ""; rNumber = "";

                return -1;
            }
        }
        static int Save_Email(string rEmail, string rRemark = "")
        {
            try
            {
                int? ID = -1;
                var dsAdapter = new adapterPersons();

                dsAdapter.Save_Email(ref ID, rEmail, rRemark);

                return ID.Value;
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return -1;
            }
        }

        public static bool Save_Person(ref int? ID, string CardId, string rName, int? tGenderId, DateTime? rBirthday, int? tPhoneId, string rPhone, int? tEmailId, string rEmail, string rRemark = "")
        {
            try
            {

                string rPhonePrefix = ""; string rNumber = "";

                tEmailId = Save_Email(rEmail, rRemark);

                tPhoneId = Save_Phone(rPhone, out rPhonePrefix, out rNumber);

                var dsAdapter = new adapterPersons();


                var nRes = dsAdapter.Save_Person(ref ID, CardId, rName, tGenderId, rBirthday, tPhoneId, rPhonePrefix, rNumber, tEmailId, rEmail, rRemark);
                return ID > 0;
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return false;
            }
        }

    }
}
