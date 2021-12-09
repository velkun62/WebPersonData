using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DAL;


namespace WebPersonData.Controllers
{
    [Route("api/[controller]")]
    public class WebPersonsController : Controller
    {
        private static PersonData[] Persons = {
              new PersonData()
              {
                   CardId = "307190033"
                  , Name = "ויקטור אלקון"
                  , Phone = "052-8027346"
                  , BirthDay = (new DateTime(1962, 04, 20)).ToString("d")
                  , Email   = "vborisich@gmail.com"
                  , Gender  = "male"
              }
            , new PersonData()
              {
                   CardId = "907190099"
                  , Name = "אולנה נברוטסקי"
                  , Phone = "052-8022222"
                  , BirthDay = (new DateTime(1970, 09, 30)).ToString("d")
                  , Email   = "navolka@gmail.com"
                  , Gender  = "female"
              }
        };

        public static string[] ArrPhonePrefixes { get; set; } = DAL.ServiceDB.Get_Prefixes();
        public static Dictionary<string , string > mapGenders { get; set; } = DAL.ServiceDB.Get_Genders();

        public static Dictionary<string , int > mapCardId2Id { get; set; } = new Dictionary<string, int>();
        public static Dictionary<string , int > mapMailId2Id { get; set; } = new Dictionary<string, int>();
        public static Dictionary<string , int > mapPhoneId2Id { get; set; } = new Dictionary<string, int>();
        
        [HttpPost("SavePersonDetail")]

        public JsonResult SavePersonDetail([FromBody]PersonData person)
        {

            int ? rId = mapCardId2Id.ContainsKey(person.CardId) ? mapCardId2Id[person.CardId] : -1;
            person.tEmailId = person.Email != null && mapMailId2Id.ContainsKey(person.Email) ? mapMailId2Id[person.Email] : -1;
            person.tPhoneId = person.Phone != null && mapPhoneId2Id.ContainsKey(person.Phone) ? mapPhoneId2Id[person.Phone] : -1;
            var rPrefix = person.tPhoneId <= 0 ? null : from pr in ArrPhonePrefixes
                                                              where pr == person.Phone.Substring(0, pr.Length)
                                                                select pr;

            if (person.tEmailId < 0 && person.Email != null && person.Email.Length > 0)
            {
                if (!DAL.ValidatorEmail.EmailIsValid(person.Email))
                    return null;
            }
            var rPref =  rPrefix != null ? rPrefix.ToArray()[0] : "";

            var dtBirth = DateTime.Now;
            if (!DateTime.TryParse(person.BirthDay, out dtBirth))
                return null;
            DAL.ServiceDB.Save_Person(ref rId, person.CardId, person.Name, person.tGenderId, dtBirth, person.Id, person.Phone, person.Id, person.Email);
            //db.EmployeeTables.Add(Employee);
            //db.SaveChanges();
            return Json("b");
        }

        [HttpPost("DeletePerson")]

        public JsonResult DeletePerson([FromBody]string sCardId)
        {

            var Id = mapCardId2Id.ContainsKey(sCardId) ? mapCardId2Id[sCardId] : -1;

            if (Id < 0)
                return null;

            var rows = DAL.ServiceDB.Delete_Person(Id);//.GetPersons_Phone();
            return Json("b");
        }


        [HttpGet("[action]")]
        public IEnumerable<PersonData> PersonDatas()
        {
            var lstRes = new List<PersonData>();

            mapCardId2Id.Clear();
            mapMailId2Id.Clear();
            mapPhoneId2Id  .Clear();

            var nId = -1;
//            var rowss = DB.ServiceDB.Delete_Person(nId);//.GetPersons_Phone();
            var rows = DAL.ServiceDB.Get_Persons();
            foreach (var r in rows)
            {
                var rPhoneFull = r.Prefix + r.Phone;
                var p = new PersonData() {
                    Id = r.Id, CardId = r.CardId, BirthDay = r.rBirthday.ToShortDateString(), Name = r.rName, 
                    tEmailId = r.tEmailId, tGenderId = r.tGenderId, tPhoneId = r.tPhoneId, Email = r.Email, Gender = "", Phone = rPhoneFull
                };
                lstRes.Add(p);

                mapCardId2Id[r.CardId] = r.Id;
                mapMailId2Id[r.Email]  = r.tEmailId;
                mapPhoneId2Id[rPhoneFull] = r.tPhoneId;

            }
            //         Persons.ToList().ForEach(x => lstRes.Add(x));
            return lstRes;
        }

        [HttpGet("[action]")]
        public IEnumerable<Gender> Genders()
        {
            var lstRes = new List<Gender>();

            var rs = from m in mapGenders
                     select new Gender() { Key = m.Key, Name = m.Value };
           return rs.ToList();
        }

        [HttpGet("[action]")]
        public IEnumerable<string> PhonePrefixes()
        {
            return ArrPhonePrefixes;
        }

        public class PersonData
        {
            public int Id { get; set; }
            public string CardId { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }


            public string BirthDay { get; set; }

            public string  Gender { get; set; }

            public string  Phone { get; set; }

            public int tEmailId  { get; set; }

            public int tGenderId { get; set; }

            public int tPhoneId { get; set; }

        }
        public class Gender
        {
            public string Key { get; set; }
            public string Name { get; set; }

        }
    }
}
