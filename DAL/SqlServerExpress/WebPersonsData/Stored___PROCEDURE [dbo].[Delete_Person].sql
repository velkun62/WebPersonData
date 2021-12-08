USE [WebPersonData]
GO
/****** Object:  StoredProcedure [dbo].[Delete_Person]    Script Date: <03/12/2021> 20:58:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Victor>
-- ALTER date: <03/12/2021>
-- Description:	<Delete_Person >
-- =============================================
alter PROCEDURE [dbo].[Delete_Person]
@ID int
AS
BEGIN
	DECLARE @err int

  delete
      from Person 
	   where Id = @ID

	 SELECT @err = coalesce(nullif(@err, 0), @@error)

	RETURN @err
END

