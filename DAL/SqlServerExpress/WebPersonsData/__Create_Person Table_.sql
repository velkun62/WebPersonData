use WebPersonData

CREATE TABLE WebPersonData.[dbo].[Persons] (
[Id] [int]  IDENTITY(1,1) PRIMARY KEY  ,

[CardId] [varchar] (10) NOT NULL ,

[rName] [nvarchar] (100) NOT NULL ,

[tGenderId] [int]  NULL,

[rBirthday] [date]  NOT NULL,

[tPhoneId] [int]  NULL,
[tEmailId] [int]  NULL,

[Remark] [nvarchar] (250),

)


