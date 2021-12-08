use WebPersonData

CREATE TABLE WebPersonData.[dbo].[Phones] (
[Id] [int]  IDENTITY(1,1) PRIMARY KEY  ,

[Prefix] [varchar] (4) NOT NULL ,
[Number] [varchar] (10) NOT NULL ,

)


